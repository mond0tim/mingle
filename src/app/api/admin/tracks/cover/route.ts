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
    const formData = await request.formData();
    const trackIdStr = formData.get("trackId") as string;
    const trackId = parseInt(trackIdStr, 10);
    const file = formData.get("file") as File;

    if (!trackIdStr || !file || isNaN(trackId)) {
      return NextResponse.json({ error: "Missing or invalid trackId or file" }, { status: 400 });
    }

    // Get track info to have title and artist for naming
    const track = await prisma.track.findUnique({
      where: { id: trackId },
      select: { title: true, artist: true }
    });

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await processAndSaveCover({
      trackId,
      buffer,
      title: track.title,
      artist: track.artist,
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
