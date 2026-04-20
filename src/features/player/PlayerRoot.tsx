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
  const setTracks = usePlayer(state => state.setTracks);
  const playPlaylist = usePlayer(state => state.playPlaylist);
  const playTrack = usePlayer(state => state.playTrack);
  const hydrateState = usePlayer(state => state.hydrateState);

  useEffect(() => {
    async function fetchData() {
      // 1. Загружаем все доступные плейлисты
      const [playlistsRes, vibeRes, queueRes] = await Promise.all([
        fetch('/api/playlists'),
        fetch('/api/vibe'),
        fetch('/api/queue')
      ]);

      const playlists: Playlist[] = await playlistsRes.json();
      const vibePlaylists: Playlist[] = await vibeRes.json();
      const allPlaylists = [...playlists, ...vibePlaylists];

      let dbState: any = { queue: [], lastPlayedTrackId: null, lastPlayedPlaylistId: null };
      if (queueRes.ok) {
        dbState = await queueRes.json();
      }

      // 2. Определяем IDs для восстановления (Приоритет: База > Кэш)
      let targetPlaylistId: string | null = dbState.lastPlayedPlaylistId ? String(dbState.lastPlayedPlaylistId) : null;
      let targetTrackId: string | null = dbState.lastPlayedTrackId ? String(dbState.lastPlayedTrackId) : null;

      // Если в базе пусто — смотрим кэш
      if (!targetPlaylistId || !targetTrackId) {
        try {
          const cacheStr = localStorage.getItem(CACHE_KEY);
          if (cacheStr) {
            const cache = JSON.parse(cacheStr);
            if (cache.length > 0) {
              if (!targetPlaylistId) targetPlaylistId = String(cache[0].playlistId);
              if (!targetTrackId) targetTrackId = String(cache[0].trackId);
            }
          }
        } catch {}
      }

      // 3. Ищем объекты плейлиста и трека
      let playlistToPlay: Playlist | null = null;
      let trackToPlay: Track | null = null;

      if (targetPlaylistId) {
        playlistToPlay = allPlaylists.find(p => String(p.id) === targetPlaylistId) || null;
      }
      
      // Fallback плейлиста если ничего не нашли
      if (!playlistToPlay) {
        playlistToPlay = vibePlaylists.find(p => p.id === "vibe_hour") || playlists[0] || null;
      }

      if (targetTrackId && playlistToPlay) {
        trackToPlay = playlistToPlay.tracks.find(t => String(t.id) === targetTrackId) || null;
      }

      // Если трек в плейлисте не найден — берем первый из плейлиста
      if (!trackToPlay && playlistToPlay && playlistToPlay.tracks.length > 0) {
        trackToPlay = playlistToPlay.tracks[0];
      }

      // 4. Очередь: из базы ИЛИ из текущего плейлиста
      const finalQueue = dbState.queue?.length > 0 ? dbState.queue : (playlistToPlay?.tracks || []);

      // 5. Гидратация
      if (trackToPlay) {
        hydrateState(finalQueue, playlistToPlay, trackToPlay);
      } else {
        setTracks(finalQueue, false);
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