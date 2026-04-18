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

    if (!colors || !colors.dominant || !colors.accent) {
      return NextResponse.json({ error: "Invalid colors payload" }, { status: 400 });
    }

    const track = await prisma.track.findUnique({
      where: { id },
      select: { colors: true },
    });

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    // Only allow update if colors are currently null (so anonymous users don't overwrite manual edits)
    if (track.colors !== null && track.colors !== undefined) {
      return NextResponse.json({ message: "Colors already set, skipping." }, { status: 200 });
    }

    const updated = await prisma.track.update({
      where: { id },
      data: { colors },
    });

    return NextResponse.json({ success: true, track: updated });
  } catch (error) {
    console.error("Failed to patch track colors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
