import fs from "fs";
import path from "path";
import sharp from "sharp";
import { getAverageColor } from "fast-average-color-node";
import { prisma } from "@/lib/db";
import { generateMingleFilename } from "@/lib/translit";

/**
 * Processes a cover image buffer, saves it to public/covers, 
 * extracts colors, and updates the database record.
 */
export async function processAndSaveCover({
  id,
  type,
  buffer,
  title,
  artist = "Collection",
}: {
  id: string | number;
  type: 'track' | 'playlist';
  buffer: Buffer;
  title: string;
  artist?: string;
}) {
  const coversDir = path.join(process.cwd(), "public", "covers");
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  // Generate standardized filename: title--artist--id.jpg
  // For playlists, artist can be a fallback or author name
  const filename = generateMingleFilename(title, artist, id, "jpg");
  const absolutePath = path.join(coversDir, filename);
  const relativePath = `/covers/${filename}`;

  // 1. Process with Sharp (800x800 JPEG, quality 80)
  const processedBuffer = await sharp(buffer)
    .resize(800, 800, { fit: "cover" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();

  const normalizedPath = path.normalize(absolutePath);

  // 1.5. Cleanup old cover if exists to avoid junk
  try {
    const existing = type === 'track' 
      ? await prisma.track.findUnique({ where: { id: Number(id) }, select: { cover: true } })
      : await prisma.playlist.findUnique({ where: { id: String(id) }, select: { cover: true } });
    
    if (existing?.cover && !existing.cover.startsWith("http")) {
      const oldPath = path.join(process.cwd(), "public", existing.cover.startsWith("/") ? existing.cover.slice(1) : existing.cover);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
  } catch (err) {
    console.warn("Could not delete old cover during update:", err);
  }

  fs.writeFileSync(normalizedPath, processedBuffer);

  // 2. Extract average colors
  let colors: { dominant: string; accent: string } | null = null;
  try {
    const avgColor = await getAverageColor(absolutePath);
    colors = {
      dominant: avgColor.hex,
      accent: avgColor.hex,
    };
  } catch (err) {
    console.error("Color extraction failed during cover update:", err);
  }

  // 3. Update DB
  let updated;
  if (type === 'track') {
    updated = await prisma.track.update({
      where: { id: Number(id) },
      data: {
        cover: relativePath,
        ...(colors && { colors: colors as any }),
      },
    });
  } else {
    updated = await prisma.playlist.update({
      where: { id: String(id) },
      data: {
        cover: relativePath,
        ...(colors && { colors: colors as any }),
      },
    });
  }

  return {
    cover: relativePath,
    colors: updated.colors,
  };
}
