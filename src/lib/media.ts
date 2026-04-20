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
  trackId,
  buffer,
  title,
  artist,
}: {
  trackId: number;
  buffer: Buffer;
  title: string;
  artist: string;
}) {
  const coversDir = path.join(process.cwd(), "public", "covers");
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  // Generate standardized filename: track--artist--id.jpg
  const filename = generateMingleFilename(title, artist, trackId, "jpg");
  const absolutePath = path.join(coversDir, filename);
  const relativePath = `/covers/${filename}`;

  // 1. Process with Sharp (800x800 JPEG, quality 80)
  await sharp(buffer)
    .resize(800, 800, { fit: "cover" })
    .toFormat("jpeg", { quality: 80 })
    .toFile(absolutePath);

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
  const updated = await prisma.track.update({
    where: { id: trackId },
    data: {
      cover: relativePath,
      ...(colors && { colors: colors as any }),
    },
  });

  return {
    cover: relativePath,
    colors: updated.colors,
  };
}
