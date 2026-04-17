"use client";

import React from 'react';
import useSWR from 'swr';
import styles from './history.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/Button/Button';
import { History as HistoryIcon, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function HistoryPage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR('/api/history', fetcher);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const playTrack = usePlayerStore(state => state.playTrack);

  const handleTrackSelect = (track: any) => {
    playTrack(track);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button 
          view="ghost" 
          onClick={() => router.back()}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="flex items-center gap-2 text-2xl font-oddval">
          <HistoryIcon size={24} />
          История прослушиваний
        </h1>
      </div>

      <div className={styles.content}>
        
        {currentTrack && (
          <section className="mb-12">
            <h2 className="text-xl font-geist mb-6 opacity-70 uppercase tracking-widest text-sm">Сейчас играет</h2>
            <TrackList 
              tracks={[currentTrack]} 
              onTrackSelect={() => {}}
              currentTrack={currentTrack}
              trackItemSpanWidth="auto"
            />
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-geist mb-6 opacity-70 uppercase tracking-widest text-sm">Недавние треки</h2>
          {isLoading ? (
            <div className="flex gap-4 overflow-hidden">
               {[1,2,3,4,5].map(i => <Skeleton key={i} className="w-32 h-32 rounded-lg" />)}
            </div>
          ) : data?.recentTracks?.length > 0 ? (
            <TrackList 
              tracks={data.recentTracks} 
              onTrackSelect={handleTrackSelect}
              currentTrack={currentTrack}
              trackItemSpanWidth="auto"
            />
          ) : (
            <p className="opacity-50">Здесь пока пусто. Начните слушать музыку!</p>
          )}
        </section>

        {/* Плейлисты можно добавить вторым API или расширить текущий */}
        {data?.recentPlaylists?.length > 0 && (
          <section>
            <h2 className="text-xl font-geist mb-6 opacity-70 uppercase tracking-widest text-sm">Недавние плейлисты</h2>
            <PlaylistsCarousel playlists={data.recentPlaylists} />
          </section>
        )}
      </div>
    </div>
  );
}
