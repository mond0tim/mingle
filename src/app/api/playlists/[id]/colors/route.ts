import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { colors } = body;

    if (!colors || !colors.background || !colors.title || !colors.button) {
      return NextResponse.json({ error: "Invalid colors payload" }, { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id },
      select: { colors: true },
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    // Only allow update if colors are currently null
    if (playlist.colors !== null && playlist.colors !== undefined) {
      return NextResponse.json({ message: "Colors already set, skipping." }, { status: 200 });
    }

    const updated = await prisma.playlist.update({
      where: { id },
      data: { colors },
    });

    return NextResponse.json({ success: true, playlist: updated });
  } catch (error) {
    console.error("Failed to patch playlist colors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
