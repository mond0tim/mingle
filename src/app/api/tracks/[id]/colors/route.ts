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

    const track = await prisma.track.findUnique({
      where: { id },
      select: { colors: true },
    });

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    const updated = await prisma.track.update({
      where: { id },
      data: { colors: { ...(track.colors as any), ...colors } },
    });

    return NextResponse.json({ success: true, track: updated });
  } catch (error) {
    console.error("Failed to patch track colors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
