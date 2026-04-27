'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { usePlayerStore as usePlayer } from '@/features/player/store/playerStore';
import { Button } from '@/components/Button/Button';
import styles from "./page.module.css";
import { OtherPlay, OtherPause } from '@/shared/ui/icons';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import PlaylistsPageClient from '@/features/playlists/ui/AllPlaylistsPageClient';
import { Playlist } from '@/types';
import AudioMotionVisualizer from '@/components/AudioMotionVisualizer/AudioMotionVisualizer';
import HomeLyrics from '@/components/HomeLyrics/HomeLyrics';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface HomePageClientProps {
  playlists: Playlist[];
  vibePlaylists: Playlist[];
}

export default function HomePageClient({ playlists, vibePlaylists }: HomePageClientProps) {
  const {
    currentTrack,
    playing,
    playPlaylist,
    playlistIsPlaying,
    togglePlay,
    playTrack,
    playTracks
  } = usePlayer();

  const { data: historyData, isLoading: historyLoading } = useSWR('/api/history', fetcher);

  const [showVisualizer, setShowVisualizer] = useState(true);

  const wavePlaylist = vibePlaylists?.[0]; // Taking the first vibe playlist as the "main" one for the hero


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && !playing) {
      timeoutId = setTimeout(() => {
        setShowVisualizer(false);
      }, 500);
    } else {
      setShowVisualizer(true);
    }
    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  const handleTrackSelect = (track: any) => {
    if (historyData?.recentTracks) {
      // Когда запускаем из недавних — собираем всю очередь из истории
      playTracks(historyData.recentTracks, track);
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="relative">
      {/* Lyrics Section */}
      <HomeLyrics />

      {/* Content wrapper with some spacing */}
      <div className="relative z-10">

        {/* 2. Recent Tracks */}
        <section className="px-2 max-w-[1400px] mx-auto mb-20">
          <div className="mb-1 px-4 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic font-oddval mb-2">Недавние треки</h2>
          </div>

          <div className="bg-black/5 rounded-3xl p-4 py-2 backdrop-blur-xl backdrop-contrast-[1.5] border border-white/5">
            <div className="noise-overlay" />
            {historyLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))}
              </div>
            ) : historyData?.recentTracks?.length > 0 ? (
              <TrackList
                tracks={historyData.recentTracks.slice(0, 5)}
                onTrackSelect={handleTrackSelect}
                currentTrack={currentTrack}
                trackItemSpanWidth="auto"
              />
            ) : (
              <div className="py-12 text-center">
                <p className="text-white-500 italic text-lg font-medium">Здесь пока пусто. Начни свое музыкальное путешествие!</p>
              </div>
            )}
          </div>
        </section>



        {/* 3. Recent Playlists Carousel */}
        {historyData?.recentPlaylists?.length > 0 && (
          <section className="px-2 max-w-[1400px] mx-auto overflow-hidden mb-20">
            <div className="mb-1 px-4 flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic font-oddval mb-2">Недавние плейлисты</h2>
            </div>
            <div className="bg-black/5 rounded-3xl p-4 py-16 backdrop-blur-xl backdrop-contrast-[1.5] border border-white/5">
              <div className="noise-overlay" />
              <PlaylistsCarousel playlists={historyData.recentPlaylists} />
            </div>
          </section>
        )}

        {/* 4. Playlists Page (Copy) */}
        <section className="max-w-[1400px] mx-auto">
          <div className="mb-1 px-4 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic font-oddval mb-2">Библиотека</h2>
          </div>
          <PlaylistsPageClient playlists={playlists} vibePlaylists={vibePlaylists} />
        </section>
      </div>
    </div>
  );
}

