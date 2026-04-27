import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { Playlist } from '@/types';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import HomePageClient from './homePageClient';

export const metadata: Metadata = {
  title: 'Mingle - Твой музыкальный мир',
  description: 'Mingle - современная музыкальная платформа с персонализированными плейлистами и умными рекомендациями.',
};

async function getPlaylists() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const [dbPlaylists, allTracksData] = await Promise.all([
    prisma.playlist.findMany({
      include: {
        tracks: {
          include: { track: true },
          orderBy: { order: 'asc' },
        },
      },
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

  const mappedPlaylists: Playlist[] = [];

  dbPlaylists.forEach(playlist => {
    if (playlist.id === 'all-tracks') {
        mappedPlaylists.push({
            ...playlist,
            category: "other",
            type: "system",
            tracks: allTracksData.map(t => ({...t, type: t.type || 'track'})),
            isPlaying: false
        } as unknown as Playlist);
        return;
    }

    if (playlist.id === 'liked-tracks') {
        if (!session?.user) return;
        mappedPlaylists.push({
            ...playlist,
            category: "other",
            type: "system",
            tracks: favorites.map(f => ({...f.track, type: f.track.type || 'track'})),
            isPlaying: false
        } as unknown as Playlist);
        return;
    }

    if (playlist.title.toLowerCase() === "все треки" && playlist.id !== 'all-tracks') return;
    if ((playlist.title.toLowerCase() === "понравившиеся" || playlist.title.toLowerCase() === "нравится") && playlist.id !== 'liked-tracks') return;
    
    mappedPlaylists.push({
      ...playlist,
      tracks: playlist.tracks.map((pt) => ({ ...pt.track, type: pt.track.type || 'track' })),
      category: playlist.category.toLowerCase() as any,
      type: playlist.type,
      isPlaying: false,
    } as unknown as Playlist);
  });

  return mappedPlaylists;
}

async function getVibePlaylists() {
  const dbVibes = await prisma.playlist.findMany({
    where: { category: 'VIBE' },
    include: {
      tracks: {
        include: { track: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  return dbVibes.map(playlist => ({
    ...playlist,
    tracks: playlist.tracks.map((pt) => ({ ...pt.track, type: pt.track.type || 'track' })),
    category: playlist.category.toLowerCase() as any,
    type: playlist.type,
    isPlaying: false,
  })) as unknown as Playlist[];
}

export default async function Home() {
  const [playlists, vibePlaylists] = await Promise.all([
    getPlaylists(),
    getVibePlaylists()
  ]);

  return <HomePageClient playlists={playlists} vibePlaylists={vibePlaylists} />;
}