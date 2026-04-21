// app/playlists/[id]/page.tsx

import PlaylistPageClient from './PlaylistPageClient';
import { Metadata } from 'next';
import { Playlist } from '@/types';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { generateAllVibePlaylists } from '@/utils/vibePlaylists';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getPlaylistById(id: string): Promise<Playlist | null> {
  const resolvedId = id === "600" ? "vibe_hour" : id;
  const vibeIds = ["vibe_hour", "vibe_day", "vibe_week", "vibe_month"];
  
  const dbPlaylist = await prisma.playlist.findUnique({
    where: { id: resolvedId },
    include: { tracks: { include: { track: true }, orderBy: { order: 'asc' } } }
  });

  if (!dbPlaylist) {
    if (vibeIds.includes(resolvedId)) {
      const vibes = await generateAllVibePlaylists();
      const found = vibes.find(v => v.id === resolvedId);
      if (found) return found as unknown as Playlist;
    }
    return null;
  }

  // 1. All Tracks interception
  if (resolvedId === "all-tracks") {
    const allTracksData = await prisma.track.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return {
      ...dbPlaylist,
      tracks: allTracksData.map(t => ({...t, type: t.type || 'track'})),
      category: dbPlaylist.category.toLowerCase() as any,
      type: dbPlaylist.type,
      isPlaying: false,
    } as unknown as Playlist;
  }

  // 2. Liked Tracks interception
  if (resolvedId === "liked-tracks") {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user) return null;

    const favorites = await prisma.favoriteTrack.findMany({
      where: { userId: session.user.id },
      include: { track: true },
      orderBy: { createdAt: 'desc' }
    });

    return {
      ...dbPlaylist,
      tracks: favorites.map(f => ({...f.track, type: f.track.type || 'track'})),
      category: dbPlaylist.category.toLowerCase() as any,
      type: dbPlaylist.type,
      isPlaying: false,
    } as unknown as Playlist;
  }

  return {
    ...dbPlaylist,
    tracks: dbPlaylist.tracks.map(t => ({...t.track, type: t.track.type || 'track'})),
    category: dbPlaylist.category.toLowerCase() as any,
    type: dbPlaylist.type,
    isPlaying: false,
  } as unknown as Playlist;
}


export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const playlistId = params.id;
  const playlist = await getPlaylistById(playlistId);

  if (!playlist) {
    return {
      title: `Playlist not found`,
      description: "Explore amazing music playlists.",
    };
  }

  return {
    title: `${playlist.title}`,
    description: "Explore amazing music playlists.",
  };
}

const PlaylistPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const playlistId = params.id;
  const playlist = await getPlaylistById(playlistId);

  if (!playlist) {
    notFound();
  }

  return <PlaylistPageClient playlist={playlist} params={params} searchParams={searchParams} />;
};

export default PlaylistPage;