import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Vibrant } from "node-vibrant/node";
import { getAverageColor } from "fast-average-color-node";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import sharp from "sharp";

const darkenColor = (color: [number, number, number], amount: number): string => {
  const [r, g, b] = color;
  return `#${[r, g, b]
    .map((c) => Math.max(0, Math.round(c - c * amount)).toString(16).padStart(2, '0'))
    .join('')}`;
};

const lightenColor = (color: [number, number, number], amount: number): string => {
  const [r, g, b] = color;
  return `#${[r, g, b]
    .map((c) => Math.min(255, Math.round(c + (255 - c) * amount)).toString(16).padStart(2, '0'))
    .join('')}`;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const getContrastingColor = (hexColor: string, alpha = 1): string => {
  try {
    let hex = hexColor.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? `rgba(0, 0, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
  } catch {
    return '#FFFFFF';
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, id, type, force = false } = body as { 
      url: string; 
      id: string; 
      type: 'track' | 'playlist';
      force?: boolean;
    };

    if (!url || !id || !type) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const stringId = String(id);
    const session = await auth.api.getSession({ headers: await headers() });
    const isAdmin = session?.user?.role === 'admin';

    // 1. ПРИОРИТЕТ КЭША: Если цвета уже есть и мы не просим форсированно (или мы не админ) — берем из базы
    if (!force || !isAdmin) {
      if (type === 'track') {
        const track = await prisma.track.findUnique({ where: { id: Number(id) } });
        if (track?.colors) return NextResponse.json({ colors: track.colors });
      } else {
        const playlist = await prisma.playlist.findUnique({ where: { id: stringId } });
        if (playlist?.colors) return NextResponse.json({ colors: playlist.colors });
      }
    }

    // 2. ПОЛНАЯ ЭКСТРАКЦИЯ (если нет в кэше или Admin + Force)
    let fetchUrl = url;
    if (url.startsWith("/")) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      fetchUrl = `${baseUrl}${url}`;
    }

    const imageRes = await fetch(fetchUrl);
    if (!imageRes.ok) throw new Error("Failed to fetch image");
    const arrayBuffer = await imageRes.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    // НОРМАЛИЗАЦИЯ И ОПТИМИЗАЦИЯ: Превращаем в стандартный PNG/RGB и сжимаем до 200px для быстрой экстракции
    const buffer = await sharp(rawBuffer)
      .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
      .toFormat('png')
      .toBuffer();

    const [vibrantPalette, facSimple, facSqrt, facDominant] = await Promise.all([
      Vibrant.from(buffer).getPalette(),
      getAverageColor(buffer, { algorithm: 'simple' }),
      getAverageColor(buffer, { algorithm: 'sqrt' }),
      getAverageColor(buffer, { algorithm: 'dominant' })
    ]);

    const swatches = [
      vibrantPalette.Vibrant,
      vibrantPalette.Muted,
      vibrantPalette.DarkVibrant,
      vibrantPalette.DarkMuted,
      vibrantPalette.LightVibrant,
      vibrantPalette.LightMuted
    ].filter(Boolean) as any[];

    const sortedSwatches = [...swatches].sort((a, b) => (b.population || 0) - (a.population || 0));
    const paletteArray = sortedSwatches.slice(0, 4).map(s => s.hex);

    // Старый "Dominant" (из Vibrant)
    const vibrantDominant = sortedSwatches[0]?.hex || '#000000';
    const vibrantAccent = vibrantPalette.Muted?.hex || (vibrantPalette.Vibrant?.hex ? darkenColor(hexToRgb(vibrantPalette.Vibrant.hex), 0.3) : '#FFFFFF');

    // Текущий Dominant (FAC) 
    // По умолчанию используем Sqrt (Perceived average) по просьбе пользователя
    const dominant = facSqrt.hex; 
    // const dominant = facDominant.hex; // Традиционный Dominant
    // const dominant = vibrantDominant; // Vibrant Dominant

    const colorsPayload: any = {
      dominant,
      accent: getContrastingColor(dominant, 1) === 'rgba(0, 0, 0, 1)' ? darkenColor(facDominant.value.slice(0, 3) as any, 0.4) : lightenColor(facDominant.value.slice(0, 3) as any, 0.6),
      vibrant: vibrantPalette.Vibrant?.hex,
      muted: vibrantPalette.Muted?.hex,
      darkVibrant: vibrantPalette.DarkVibrant?.hex,
      darkMuted: vibrantPalette.DarkMuted?.hex,
      lightVibrant: vibrantPalette.LightVibrant?.hex,
      lightMuted: vibrantPalette.LightMuted?.hex,
      palette: paletteArray,
      
      facetSimple: facSimple.hex,
      facetSqrt: facSqrt.hex,
      facetDominant: facDominant.hex,
      vibrantDominant,
      vibrantAccent
    };

    if (type === 'playlist') {
      // Для плейлистов используем более сочные цвета из Vibrant, как раньше
      const playlistDominant = vibrantPalette.Vibrant?.hex || facSqrt.hex;
      colorsPayload.dominant = playlistDominant;
      colorsPayload.background = playlistDominant;
      colorsPayload.title = getContrastingColor(playlistDominant);
      colorsPayload.button = vibrantPalette.Muted?.hex || vibrantPalette.Vibrant?.hex || (facSqrt.isDark ? lightenColor(facSqrt.value.slice(0, 3) as any, 0.5) : darkenColor(facSqrt.value.slice(0, 3) as any, 0.4));
      colorsPayload.icon = getContrastingColor(colorsPayload.button);
    }

    // 4. Обновляем БД (безопасно, не падем если записи нет)
    try {
      if (type === 'track') {
        const trackIdNum = Number(id);
        const existing = await prisma.track.findUnique({ where: { id: trackIdNum }, select: { colors: true } });
        const keepBindings = (existing?.colors as any)?.bindings;
        await prisma.track.update({
          where: { id: trackIdNum },
          data: { colors: keepBindings ? { ...colorsPayload, bindings: keepBindings } : colorsPayload },
        });
      } else if (type === 'playlist') {
        const existing = await prisma.playlist.findUnique({ where: { id: stringId }, select: { colors: true } });
        const keepBindings = (existing?.colors as any)?.bindings;
        await prisma.playlist.update({
          where: { id: stringId },
          data: { colors: keepBindings ? { ...colorsPayload, bindings: keepBindings } : colorsPayload },
        });
      }
    } catch (e: any) {
      if (e.code === 'P2025') {
        console.warn(`[Color Extract] DB persistence skipped: ${type} "${stringId}" not found in database.`);
      } else {
        console.error(`[Color Extract] Database update failed for ${type} "${stringId}":`, e);
      }
    }

    return NextResponse.json({ colors: colorsPayload });

  } catch (error: any) {
    console.error("Color extraction error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
