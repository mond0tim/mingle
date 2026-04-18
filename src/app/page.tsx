/* eslint-disable */

'use client';
import React, { useState, useEffect } from 'react';
import { usePlayerStore as usePlayer } from '@/features/player/store/playerStore';
import { Button } from '@/components/Button/Button';
import styles from "./page.module.css"

import { OtherPlay } from '@/shared/ui/icons';
import { OtherPause } from '@/shared/ui/icons';

// ЕСТЬ ВОЗМОЖНОСТЬ СЛОМАТЬ ДАННЫЙ КОД, ПРОСЬБА НЕ ТРОГАТЬ ЕГО!!!!!!!!!!!!!

import AudioMotionVisualizer from '@/components/AudioMotionVisualizer/AudioMotionVisualizer';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import ColorPaletteDisplay from '@/components/ColorPaletteDisplay/ColorPaletteDisplay';

const CATEGORY_NAMES: Record<string, string> = {
  vibe: 'По настроению',
};

const categoryOrder: string[] = ['vibe'];

const Home = () => {
  const {
    currentTrack,
    playing,
    playPlaylist,
    playlistIsPlaying,
    togglePlay,
  } = usePlayer();

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);

  // Получение плейлистов с API + периодический refetch каждые 15 мин
  const fetchVibes = () => {
    fetch('/api/vibe')
      .then(res => res.json())
      .then(data => {
        setPlaylists(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchVibes();
    const interval = setInterval(fetchVibes, 15 * 60 * 1000); // 15 мин
    return () => clearInterval(interval);
  }, []);

  const wavePlaylist = playlists.find((p) => p.category === "vibe");

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && playing) {
      setShowBackground(false);
    } else {
      timeoutId = setTimeout(() => {
        setShowBackground(true);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && !playing) {
      timeoutId = setTimeout(() => {
        setShowVisualizer(false);
      }, 500);
    } else {
      setShowVisualizer(true);
    }

    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  // Группировка по категориям
  const playlistsByCategory = playlists.reduce((acc, playlist) => {
    if (playlist.category === 'vibe') {
      if (!acc['vibe']) {
        acc['vibe'] = [];
      }
      acc['vibe'].push(playlist);
    }
    return acc;
  }, {} as Record<string, typeof playlists>);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.preview}>
          <div className={styles.vibe}>
            <h1 className={styles.title}>запусти свой вайб</h1>
            <Skeleton />
            {loading ? (
              <Skeleton className="h-[48px] w-[140px] rounded-lg mt-4" />
            ) : wavePlaylist && (
              <Button
                ButtonRadius="lg"
                view="outline-solid"
                fontFamily='Oddval'
                fontWeight='bold'
                className={styles.vibe_button}
                onClick={(e) => {
                  e.stopPropagation();
                  if (playlistIsPlaying?.category === wavePlaylist.category) {
                    togglePlay();
                  } else {
                    playPlaylist(wavePlaylist);
                  }
                }}
              >
                <span className="material-symbols-outlined">
                  {playlistIsPlaying?.category === wavePlaylist.category && playing
                    ? <OtherPause />
                    : <OtherPlay />
                  }
                  вайб
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && showVisualizer ? (
        <div className={styles.canvas_container}>
          <AudioMotionVisualizer
          />
        </div>
      ) : null}
      {showBackground && <BackgroundCanvas />}

      <div className="max-w-7xl mx-auto px-4">
        <ColorPaletteDisplay />
      </div>

      {playlistsByCategory['vibe'] && playlistsByCategory['vibe'].length > 0 && (
        <div className="my-8 p-2">
          <h2 className="text-xl font-oddval mb-4 font-geist">
            {CATEGORY_NAMES['vibe']}
          </h2>
          <PlaylistsCarousel playlists={playlistsByCategory['vibe']} />
        </div>
      )}
    </>
  );
};

export default Home;