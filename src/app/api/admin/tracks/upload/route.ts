import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";
import * as mm from "music-metadata";
import { updateAudioMetadata } from "@/lib/id3";
import { getAverageColor } from "fast-average-color-node";
import sharp from "sharp";
import { generateMingleFilename } from "@/lib/translit";
import { processAndSaveCover } from "@/lib/media";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await mm.parseBuffer(buffer, file.type);

    const title = (formData.get("title") as string) || metadata.common.title || "Unknown Track";
    const artist = (formData.get("artist") as string) || metadata.common.artist || "Unknown Artist";
    const album = (formData.get("album") as string) || metadata.common.album || "";
    
    // 1. Создаем запись в БД ПЕРВОЙ, чтобы получить ID
    const track = await prisma.track.create({
      data: {
        title: title.trim(),
        artist: artist.trim(),
        src: "temp", // Временный путь
        cover: "",   // Поле обязательно в БД, используем пустую строку до финального обновления
      },
    });

    const extension = path.extname(file.name) || ".mp3";
    const baseFilename = generateMingleFilename(title, artist, track.id, ""); // Без расширения для основы
    
    // 2. Пути для аудио
    const audioDir = path.join(process.cwd(), "public", "audio");
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

    const audioFilename = `${baseFilename}${extension}`;
    const absoluteAudioPath = path.join(audioDir, audioFilename);
    const relativeAudioPath = `/audio/${audioFilename}`;

    // Сохраняем аудио
    fs.writeFileSync(absoluteAudioPath, buffer);

    // 3. Обработка обложки и цветов
    let colors: any = null;
    let coverUrl: string | null = null;

    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const pic = metadata.common.picture[0];
      const { cover, colors: extractedColors } = await processAndSaveCover({
        id: track.id,
        type: 'track',
        buffer: Buffer.from(pic.data),
        title,
        artist
      });
      coverUrl = cover;
      colors = extractedColors;
    }

    // 4. Обновляем запись в БД финальными путями
    const updatedTrack = await prisma.track.update({
      where: { id: track.id },
      data: {
        src: relativeAudioPath,
        cover: coverUrl || "/placeholder.png",
        colors: colors ? (colors as any) : undefined,
      },
    });

    // 5. Прошивка метаданных ID3
    try {
      await updateAudioMetadata(relativeAudioPath, {
        title,
        artist,
        album,
        coverPath: coverUrl || undefined
      });
    } catch (err) {
      console.error("ID3 sewing failed:", err);
    }

    return NextResponse.json({ track: updatedTrack });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
