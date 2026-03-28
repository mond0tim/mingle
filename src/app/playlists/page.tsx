import { Metadata } from 'next';
import PlaylistsPageClient from './playlistsPageClient';

export const metadata: Metadata = {
  title: 'Плейлисты',
  description: 'Персонализированные плейлисты для вашего настроения. Собирайте треки, редактируйте подборки и делитесь музыкой с Mingle.',
  keywords: 'музыкальные плейлисты, создать плейлист, коллекция треков, управление плейлистами',
};

async function getPlaylists() {
  const res = await fetch(`${process.env.BASE_URL || ''}/api/playlists`, { cache: 'no-store' });
  return res.json();
}

async function getVibePlaylists() {
  const res = await fetch(`${process.env.BASE_URL || ''}/api/vibe`, { cache: 'no-store' });
  return res.json();
}

const PlaylistsPage = async () => {
  const [playlists, vibePlaylists] = await Promise.all([getPlaylists(), getVibePlaylists()]);

  return (
    <PlaylistsPageClient playlists={playlists} vibePlaylists={vibePlaylists} />
  );
};

export default PlaylistsPage;