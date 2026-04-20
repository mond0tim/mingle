import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { processAndSaveCover } from "@/lib/media";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { getAverageColor } from "fast-average-color-node";

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
    const playlistId = formData.get("playlistId") as string;
    const file = formData.get("file") as File;

    if (!playlistId || !file) {
      return NextResponse.json({ error: "Missing playlistId or file" }, { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { title: true }
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process cover specifically for playlist
    const coversDir = path.join(process.cwd(), "public", "covers");
    if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

    const filename = `playlist--${playlistId}--${Date.now()}.jpg`;
    const absolutePath = path.join(coversDir, filename);
    const relativePath = `/covers/${filename}`;

    await sharp(buffer)
      .resize(800, 800, { fit: "cover" })
      .toFormat("jpeg", { quality: 80 })
      .toFile(absolutePath);

    // Extract colors
    let colors = null;
    try {
      const avgColor = await getAverageColor(absolutePath);
      colors = {
        background: "#000000", // Default dark backdrop
        button: avgColor.hex,
        title: "#FFFFFF",
      };
    } catch (err) {
      console.error("Playlist color extraction failed:", err);
    }

    const updated = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        cover: relativePath,
        ...(colors && { colors: colors as any })
      }
    });

    return NextResponse.json({ 
      success: true, 
      cover: updated.cover, 
      colors: updated.colors 
    });
  } catch (error: any) {
    console.error("Playlist cover upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
