import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { Prisma } from '@/generated/prisma';

type PlaylistWithTracks = Prisma.PlaylistGetPayload<{
  include: { tracks: { include: { track: true } } }
}>;

export async function GET() {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        tracks: {
          include: {
            track: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    const mappedPlaylists = playlists.map((playlist) => ({
      ...playlist,
      tracks: playlist.tracks.map((pt) => pt.track),
    }));

    return NextResponse.json(mappedPlaylists);
  } catch (error) {
    console.error('Failed to fetch playlists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}