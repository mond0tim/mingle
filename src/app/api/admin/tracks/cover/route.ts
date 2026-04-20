import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { processAndSaveCover } from "@/lib/media";
import { prisma } from "@/lib/db";

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
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") as "track" | "playlist") || "track";
    
    const formData = await request.formData();
    const id = formData.get("trackId") as string; // We keep the param name "trackId" for form compatibility or change it
    const file = formData.get("file") as File;

    if (!id || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let title = "";
    let artist = "Collection";

    if (type === 'track') {
      const track = await prisma.track.findUnique({
        where: { id: parseInt(id, 10) },
        select: { title: true, artist: true }
      });
      if (!track) return NextResponse.json({ error: "Track not found" }, { status: 404 });
      title = track.title;
      artist = track.artist;
    } else {
      const playlist = await prisma.playlist.findUnique({
        where: { id: String(id) },
        select: { title: true }
      });
      if (!playlist) return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
      title = playlist.title;
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await processAndSaveCover({
      id,
      type,
      buffer,
      title,
      artist,
    });

    return NextResponse.json({ 
      success: true, 
      cover: result.cover, 
      colors: result.colors 
    });
  } catch (error: any) {
    console.error("Cover upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
