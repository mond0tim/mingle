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
      const playlistsRes = await fetch('/api/playlists');
      const playlists: Playlist[] = await playlistsRes.json();

      const vibeRes = await fetch('/api/vibe');
      const vibePlaylists: Playlist[] = await vibeRes.json();

      const allPlaylists = [...playlists, ...vibePlaylists];

      // Получаем массив кэша
      let cache: { playlistId: string; trackId: string }[] = [];
      try {
        const cacheStr = localStorage.getItem(CACHE_KEY);
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch {}

      let playlistToPlay: Playlist | null = null;
      let trackToPlay: Track | null = null;

      // Если есть кэш — ищем плейлист и трек
      if (cache.length > 0) {
        const { playlistId, trackId } = cache[0];
        playlistToPlay = allPlaylists.find(p => String(p.id) === String(playlistId)) || null;
        if (playlistToPlay) {
          trackToPlay = playlistToPlay.tracks.find(t => String(t.id) === String(trackId)) || null;
        }
      }

      // Если нет кэша — ищем vibe-плейлист
      if (!playlistToPlay) {
        playlistToPlay = vibePlaylists.find(p => p.id === "vibe_hour") || null;
      }

      // Если нет vibe — fallback на первый обычный плейлист
      if (!playlistToPlay && playlists.length > 0) {
        playlistToPlay = playlists[0];
      }

      let queueObj: any[] = [];
      try {
        const queueRes = await fetch('/api/queue');
        if (queueRes.ok) {
           const queueData = await queueRes.json();
           queueObj = queueData.queue || [];
        }
      } catch (e) {}

      // Определяем финальную очередь: сохранённая очередь ИЛИ треки текущего плейлиста
      const finalQueue = queueObj.length > 0 ? queueObj : (playlistToPlay?.tracks || []);

      if (playlistToPlay && trackToPlay) {
        hydrateState(finalQueue, playlistToPlay, trackToPlay);
      } else if (playlistToPlay && playlistToPlay.tracks.length > 0) {
        hydrateState(finalQueue, playlistToPlay, playlistToPlay.tracks[0]);
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