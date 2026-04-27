"use client";

import React, { useEffect } from 'react';
import useSWR from 'swr';
import styles from './history.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/Button/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function HistoryPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data, error, isLoading } = useSWR('/api/history', fetcher);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const playTrack = usePlayerStore(state => state.playTrack);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/');
    }
  }, [session, isPending, router]);

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
        <div className="flex items-center gap-3">
          <Button 
            view="ghost" 
            onClick={() => router.back()}
            className="rounded-full h-9 w-9 p-0 bg-white/5 border border-white/10"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-oddval">История</h1>
        </div>
      </header>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/10 min-h-[70vh]">
        <div className="space-y-6">
          <section>
            <h2 className="text-[10px] font-geist uppercase tracking-[0.2em] opacity-30 font-bold mb-4">Недавние треки</h2>
            
            {isLoading ? (
              <div className="space-y-2">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
              </div>
            ) : data?.recentTracks?.length > 0 ? (
              <TrackList 
                tracks={data.recentTracks} 
                onTrackSelect={playTrack}
                currentTrack={currentTrack}
                trackItemSpanWidth="auto"
              />
            ) : (
              <p className="opacity-20 text-center py-20 text-sm">История пуста</p>
            )}
          </section>

          {data?.recentPlaylists?.length > 0 && (
            <section>
              <h2 className="text-[10px] font-geist uppercase tracking-[0.2em] opacity-30 font-bold mb-4">Недавние плейлисты</h2>
              <PlaylistsCarousel playlists={data.recentPlaylists} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
