import { Metadata } from 'next';
import PlaylistsPageClient from './playlistsPageClient';

export const metadata: Metadata = {
  title: 'Плейлисты',
  description: 'Персонализированные плейлисты для вашего настроения. Собирайте треки, редактируйте подборки и делитесь музыкой с Mingle.',
  keywords: 'музыкальные плейлисты, создать плейлист, коллекция треков, управление плейлистами',
};

import { prisma } from '@/lib/db';
import { Playlist } from '@/types';

export const revalidate = 600; // SSG rebuild every 10 min

async function getPlaylists() {
  const dbPlaylists = await prisma.playlist.findMany({
    include: {
      tracks: {
        include: { track: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  return dbPlaylists.map(playlist => ({
    ...playlist,
    tracks: playlist.tracks.map((pt) => ({ ...pt.track, type: pt.track.type || 'track' })),
    category: playlist.category.toLowerCase() as any,
    type: playlist.type,
    isPlaying: false,
  })) as unknown as Playlist[];
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

const PlaylistsPage = async () => {
  const [playlists, vibePlaylists] = await Promise.all([getPlaylists(), getVibePlaylists()]);

  return (
    <PlaylistsPageClient playlists={playlists} vibePlaylists={vibePlaylists} />
  );
};

export default PlaylistsPage;