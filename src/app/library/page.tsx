"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import styles from './library.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/lib/auth-client';
import FloatingBar from '@/components/FloatingBar/FloatingBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LibraryPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: trackData, isLoading: tracksLoading } = useSWR('/api/favorites/tracks', fetcher);
  const { data: playlistData, isLoading: playlistsLoading } = useSWR('/api/favorites/playlists', fetcher);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const playTrack = usePlayerStore(state => state.playTrack);
  const playTracks = usePlayerStore(state => state.playTracks);
  const [activeTab, setActiveTab] = useState('tracks');

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/');
    }
  }, [session, isPending, router]);

  const buttons = [
    { id: 'tracks', label: 'Треки' },
    { id: 'playlists', label: 'Плейлисты' },
    { id: 'artists', label: 'Авторы' },
  ];

  if (isPending || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl font-oddval">Медиатека</h1>

          <div className="bg-white/5 backdrop-blur-md rounded-full border border-white/10 self-start md:self-auto">
            <FloatingBar
              activeButton={activeTab}
              setActiveButton={setActiveTab}
              buttons={buttons}
            />
          </div>
        </div>
      </header>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/10 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'tracks' && (
            <motion.div
              key="tracks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tracksLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
                </div>
              ) : trackData?.tracks?.length > 0 ? (
                <TrackList
                  tracks={trackData.tracks}
                  onTrackSelect={(track) => playTracks(trackData.tracks, track, { title: 'Любимое', id: 'liked', tracks: trackData.tracks } as any)}
                  currentTrack={currentTrack}
                  trackItemSpanWidth="auto"
                />
              ) : (
                <p className="opacity-20 text-center py-20 text-sm">Список пуст</p>
              )}
            </motion.div>
          )}

          {activeTab === 'playlists' && (
            <motion.div
              key="playlists"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {playlistsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square rounded-xl" />)}
                </div>
              ) : playlistData?.playlists?.length > 0 ? (
                <PlaylistsCarousel playlists={playlistData.playlists} />
              ) : (
                <p className="opacity-20 text-center py-20 text-sm">Нет плейлистов</p>
              )}
            </motion.div>
          )}

          {activeTab === 'artists' && (
            <motion.div
              key="artists"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 opacity-20"
            >
              <p className="text-sm font-geist">Раздел в разработке</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
