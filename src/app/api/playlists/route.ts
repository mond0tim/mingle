import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { Prisma } from '@/generated/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

type PlaylistWithTracks = Prisma.PlaylistGetPayload<{
  include: { tracks: { include: { track: true } } }
}>;

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    const [playlists, allTracksData] = await Promise.all([
      prisma.playlist.findMany({
        include: {
          tracks: {
            include: { track: true },
            orderBy: { order: 'asc' }
          }
        }
      }),
      prisma.track.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    const favorites = session?.user ? await prisma.favoriteTrack.findMany({
      where: { userId: session.user.id },
      include: { track: true },
      orderBy: { createdAt: 'desc' }
    }) : [];

    const mappedPlaylists: any[] = [];

    // Process actual Database Playlists
    playlists.forEach((playlist) => {
      // 1. All Tracks
      if (playlist.id === 'all-tracks') {
        mappedPlaylists.push({
          ...playlist,
          category: 'other',
          tracks: allTracksData
        });
        return;
      }

      // 2. Liked Tracks
      if (playlist.id === 'liked-tracks') {
        if (!session?.user) return; // Do not return if not logged in
        mappedPlaylists.push({
          ...playlist,
          category: 'other',
          tracks: favorites.map(f => f.track)
        });
        return;
      }

      // Hide legacy duplicate titles if any leftover with random IDs
      if (playlist.title.toLowerCase() === "все треки" && playlist.id !== 'all-tracks') return; 
      if ((playlist.title.toLowerCase() === "понравившиеся" || playlist.title.toLowerCase() === "нравится") && playlist.id !== 'liked-tracks') return;

      mappedPlaylists.push({
        ...playlist,
        tracks: playlist.tracks.map((pt) => pt.track),
      });
    });

    return NextResponse.json(mappedPlaylists);
  } catch (error) {
    console.error('Failed to fetch playlists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}