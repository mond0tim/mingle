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

    if (!colors || typeof colors !== "object") {
      return NextResponse.json({ error: "Invalid colors payload" }, { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id },
      select: { colors: true },
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    const updated = await prisma.playlist.update({
      where: { id },
      data: { colors: { ...(playlist.colors as any), ...colors } },
    });

    return NextResponse.json({ success: true, playlist: updated });
  } catch (error) {
    console.error("Failed to patch playlist colors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
