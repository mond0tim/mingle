"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import styles from './profile.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';
import TrackList from '@/components/TrackList/TrackList';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/Button/Button';
import { useSession, signOut } from '@/lib/auth-client';
import {
  Settings,
  LogOut,
} from 'lucide-react';
import FloatingBar from '@/components/FloatingBar/FloatingBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: historyData, isLoading: historyLoading } = useSWR('/api/history', fetcher);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const playTrack = usePlayerStore(state => state.playTrack);
  const playTracks = usePlayerStore(state => state.playTracks);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/');
    }
  }, [session, isPending, router]);

  const buttons = [
    { id: 'history', label: 'История' },
    { id: 'settings', label: 'Настройки' },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

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
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
              {session.user.image ? (
                <Image src={session.user.image} alt={session.user.name} width={80} height={80} className="object-cover" />
              ) : (
                <div className="text-2xl font-oddval opacity-20">{session.user.name?.[0]}</div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-primary p-1 rounded-full shadow-lg">
              <Settings size={12} className="text-black" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-oddval">{session.user.name}</h1>
            <p className="opacity-30 text-xs">{session.user.email}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <FloatingBar
              activeButton={activeTab}
              setActiveButton={setActiveTab}
              buttons={buttons}
            />
          </div>
        </div>
      </header>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/10 min-h-[50vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <section>
                <h2 className="text-[10px] font-geist uppercase tracking-[0.2em] opacity-30 font-bold mb-4">Недавние треки</h2>

                {historyLoading ? (
                  <div className="grid grid-cols-1 gap-2">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
                  </div>
                ) : historyData?.recentTracks?.length > 0 ? (
                  <TrackList
                    tracks={historyData.recentTracks}
                    onTrackSelect={(track) => playTracks(historyData.recentTracks, track)}
                    currentTrack={currentTrack}
                    trackItemSpanWidth="auto"
                  />
                ) : (
                  <p className="opacity-20 text-center py-10 text-sm">История пуста</p>
                )}
              </section>

              {historyData?.recentPlaylists?.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-geist uppercase tracking-[0.2em] opacity-30 font-bold mb-4">Недавние плейлисты</h2>
                  <PlaylistsCarousel playlists={historyData.recentPlaylists} />
                </section>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg"
            >
              <h2 className="text-[10px] font-geist uppercase tracking-[0.2em] opacity-30 font-bold mb-6">Настройки</h2>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-base font-geist mb-0.5">Данные профиля</h3>
                  <p className="opacity-30 text-[10px] mb-3">Имя и аватар</p>
                  <Button view="outline-solid" className="rounded-full h-8 text-[10px] px-4">Изменить</Button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-base font-geist mb-0.5">Безопасность</h3>
                  <p className="opacity-30 text-[10px] mb-3">Пароль и 2FA</p>
                  <Button view="outline-solid" className="rounded-full h-8 text-[10px] px-4">Настроить</Button>
                </div>

                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <h3 className="text-base font-geist mb-0.5 text-red-500">Аккаунт</h3>
                  <p className="opacity-30 text-[10px] mb-3">Выход или удаление</p>
                  <div className="flex gap-2">
                    <Button view="outline-solid" onClick={handleLogout} className="rounded-full h-8 text-[10px] px-4 flex items-center gap-2">
                      <LogOut size={12} /> Выйти
                    </Button>
                    <Button view="ghost" className="text-red-500 hover:bg-red-500 hover:text-white rounded-full h-8 text-[10px] px-4">Удалить</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
