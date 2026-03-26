// app/playlists/[id]/page.tsx

import PlaylistPageClient from './PlaylistPageClient';
import { Metadata } from 'next';
import { Playlist } from '@/types';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPlaylistById(id: number): Promise<Playlist | null> {
  // Получаем обычные плейлисты
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/playlists`, { cache: 'no-store' });
  const playlists: Playlist[] = await res.json();

  // Получаем вайб-плейлисты
  const vibeRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vibe`, { cache: 'no-store' });
  const vibePlaylists: Playlist[] = await vibeRes.json();

  // Ищем плейлист по id среди всех
  const allPlaylists = [...playlists, ...vibePlaylists];
  return allPlaylists.find((p) => p.id === id) || null;
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const playlistId = parseInt(params.id, 10);
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

const PlaylistPage = async ({ params, searchParams }: Props) => {
  const playlistId = parseInt(params.id, 10);
  const playlist = await getPlaylistById(playlistId);

  return <PlaylistPageClient playlist={playlist} params={params} searchParams={searchParams} />;
};

export default PlaylistPage;