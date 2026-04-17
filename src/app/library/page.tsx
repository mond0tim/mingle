"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import styles from './library.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/Button/Button';
import { Library as LibraryIcon, Heart, Disc, Mic2, LayoutGrid } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LibraryPage() {
  const { data: trackData, isLoading: tracksLoading } = useSWR('/api/favorites/tracks', fetcher);
  const { data: playlistData, isLoading: playlistsLoading } = useSWR('/api/favorites/playlists', fetcher);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const playTrack = usePlayerStore(state => state.playTrack);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className="flex items-center gap-2 text-3xl font-oddval">
          <LibraryIcon size={32} className="text-primary" />
          Моя Медиатека
        </h1>
      </header>

      <Tabs defaultValue="tracks" className="w-full">
        <TabsList className="bg-transparent border-b border-white/5 w-full justify-start rounded-none h-12 gap-8 px-0 mb-8">
          <TabsTrigger value="tracks" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-lg gap-2">
            <Heart size={20} /> Любимые треки
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-lg gap-2">
            <LayoutGrid size={20} /> Плейлисты
          </TabsTrigger>
          <TabsTrigger value="artists" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-lg gap-2">
            <Mic2 size={20} /> Авторы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="mt-0">
          {tracksLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[1,2,3,4,5,6,7,8,9,10].map(i => <Skeleton key={i} className="aspect-square rounded-xl" />)}
            </div>
          ) : trackData?.tracks?.length > 0 ? (
            <TrackList 
              tracks={trackData.tracks} 
              onTrackSelect={playTrack}
              currentTrack={currentTrack}
              trackItemSpanWidth="auto"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
              <Heart size={64} className="mb-4" />
              <p className="text-xl">Вы еще не добавили ни одного трека в любимые</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="mt-0">
          {playlistsLoading ? (
            <div className="flex gap-6 overflow-hidden">
               {[1,2,3].map(i => <Skeleton key={i} className="w-64 h-64 rounded-xl" />)}
            </div>
          ) : playlistData?.playlists?.length > 0 ? (
            <PlaylistsCarousel playlists={playlistData.playlists} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
              <LayoutGrid size={64} className="mb-4" />
              <p className="text-xl">Нет сохраненных плейлистов</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="artists" className="mt-0">
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Mic2 size={64} className="mb-4" />
            <p className="text-xl">Раздел в разработке</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
