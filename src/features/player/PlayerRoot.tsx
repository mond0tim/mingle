'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Playlist, Track } from '@/types';
import { usePlayerStore as usePlayer } from '@/features/player/store/playerStore';
import Player from './ui/Player';

interface PlayerWrapperProps {
  children: React.ReactNode;
}

const CACHE_KEY = 'mingle_last_played';

const PlayerWrapper: React.FC<PlayerWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(false);
  const { setTracks, playPlaylist, playTrack } = usePlayer();

  useEffect(() => {
    async function fetchData() {
      const playlistsRes = await fetch('/api/playlists');
      const playlists: Playlist[] = await playlistsRes.json();

      const vibeRes = await fetch('/api/vibe');
      const vibePlaylists: Playlist[] = await vibeRes.json();

      const allPlaylists = [...playlists, ...vibePlaylists];
      const allTracks = allPlaylists.flatMap((p: Playlist) => p.tracks || []);
      setTracks(allTracks);

      // Получаем массив кэша
      let cache: { playlistId: number; trackId: number }[] = [];
      try {
        const cacheStr = localStorage.getItem(CACHE_KEY);
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch {}

      let playlistToPlay: Playlist | null = null;
      let trackToPlay: Track | null = null;

      // Если есть кэш — ищем плейлист и трек
      if (cache.length > 0) {
        const { playlistId, trackId } = cache[0];
        playlistToPlay = allPlaylists.find(p => p.id === playlistId) || null;
        if (playlistToPlay) {
          trackToPlay = playlistToPlay.tracks.find(t => t.id === trackId) || null;
        }
      }

      // Если нет кэша — ищем vibe-плейлист с id=600
      if (!playlistToPlay) {
        playlistToPlay = vibePlaylists.find(p => p.id === 600) || null;
      }

      // Если нет vibe — fallback на первый обычный плейлист
      if (!playlistToPlay && playlists.length > 0) {
        playlistToPlay = playlists[0];
      }

      if (playlistToPlay) {
        // autoplay=false: плейлист загружается на паузе, ждём нажатия кнопки
        await playPlaylist(playlistToPlay, undefined, false);
        if (trackToPlay) {
          await playTrack(trackToPlay, playlistToPlay, false);
        }
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [setTracks, playPlaylist, playTrack]);

  useEffect(() => {
    setShowPlayer(pathname !== '/probe');
  }, [pathname]);

  return (
    <>
      {children}
      {showPlayer && <Player />}
    </>
  );
};

export default PlayerWrapper;