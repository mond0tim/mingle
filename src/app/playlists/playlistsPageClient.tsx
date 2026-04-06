'use client';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Playlist } from '@/types';

const CATEGORY_NAMES: Record<string, string> = {
  playlist: 'Плейлисты',
  album: 'Альбомы',
  single: 'Синглы',
  vibe: 'По настроению',
  other: 'Другое'
};

type PlaylistsPageClientProps = {
  playlists: Playlist[];
  vibePlaylists: Playlist[];
};

const categoryOrder: (string | 'other' | 'single' | 'album' | 'vibe' | 'playlist')[] = [
  'playlist',
  'album',
  'single',
  'vibe',
  'other'
];

const PlaylistsPageClient = ({ playlists, vibePlaylists }: PlaylistsPageClientProps) => {
  const playlistsByCategory = playlists.reduce((acc, playlist) => {
    const cat = playlist.category?.toLowerCase() || 'other';
    const category = categoryOrder.includes(cat as any)
      ? cat
      : 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(playlist);
    return acc;
  }, {} as Record<string, typeof playlists>);

  // Добавляем вайб-плейлисты в категорию vibe
  playlistsByCategory['vibe'] = vibePlaylists;

  const getCategoryTitle = (category: string) => {
    return CATEGORY_NAMES[category] ||
      category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className='p-2 md:p-5 md:ps-52'>
      <h1 className='text-2xl font-bold mb-4 font-oddval'>
        Что послушаем сегодня?
      </h1>
      {categoryOrder.map((category) => {
        const playlists = playlistsByCategory[category];
        if (!playlists || playlists.length === 0) return null;
        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 font-geist">
              {getCategoryTitle(category)}
            </h2>
            <PlaylistsCarousel playlists={playlists} />
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistsPageClient;