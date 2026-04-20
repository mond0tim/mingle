import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// GET /api/admin/playlists/[id]/tracks
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;

  const playlistTracks = await prisma.playlistTrack.findMany({
    where: { playlistId: id },
    include: {
      track: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json({ 
    tracks: playlistTracks.map(pt => ({
      ...pt.track,
      order: pt.order,
      playlistTrackId: pt.id
    })) 
  });
}

// POST /api/admin/playlists/[id]/tracks — Add a track to playlist
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const { trackId: trackIdRaw } = await request.json();
  const trackId = typeof trackIdRaw === "string" ? parseInt(trackIdRaw, 10) : trackIdRaw;

  if (!trackId || isNaN(trackId)) {
    return NextResponse.json({ error: "Missing or invalid trackId" }, { status: 400 });
  }

  // Get max order
  const lastTrack = await prisma.playlistTrack.findFirst({
    where: { playlistId: id },
    orderBy: { order: "desc" },
  });

  const newOrder = (lastTrack?.order ?? -1) + 1;

  const pt = await prisma.playlistTrack.create({
    data: {
      playlistId: id,
      trackId,
      order: newOrder,
    },
    include: { track: true }
  });

  return NextResponse.json({ track: pt });
}

// PUT /api/admin/playlists/[id]/tracks — Update track order (batch)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const { trackIds } = await request.json(); // Array of track IDs in the new order

  if (!Array.isArray(trackIds)) {
    return NextResponse.json({ error: "trackIds must be an array" }, { status: 400 });
  }

  // Transaction to update all orders with explicit timeout
  await prisma.$transaction(async (tx) => {
    for (let index = 0; index < trackIds.length; index++) {
      const trackIdRaw = trackIds[index];
      const trackId = typeof trackIdRaw === "string" ? parseInt(trackIdRaw, 10) : trackIdRaw;
      
      await tx.playlistTrack.updateMany({
        where: { playlistId: id, trackId },
        data: { order: index },
      });
    }
  }, {
    timeout: 15000 // 15 seconds
  });

  return NextResponse.json({ success: true });
}

// DELETE /api/admin/playlists/[id]/tracks — Remove track from playlist
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const { trackId: trackIdRaw } = await request.json();
  const trackId = typeof trackIdRaw === "string" ? parseInt(trackIdRaw, 10) : trackIdRaw;

  if (!trackId || isNaN(trackId)) {
    return NextResponse.json({ error: "Missing or invalid trackId" }, { status: 400 });
  }

  await prisma.playlistTrack.deleteMany({
    where: { playlistId: id, trackId },
  });

  return NextResponse.json({ success: true });
}
