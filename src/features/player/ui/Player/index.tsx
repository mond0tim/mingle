"use client"
import React, { useState, useEffect, useRef } from "react"
import { Howler } from "howler"
import styles from "./Player.module.css"
import { useMediaQuery } from "react-responsive"

import { motion, AnimatePresence } from "framer-motion"

import PlayerControls from "../PlayerControls"
import MobilePlayer from "../MobilePlayer"
import PlayerSkeleton from "./PlayerSkeleton"
import PlayerLoader from "../PlayerLoader"

import { usePlayerStore as usePlayer } from "@/features/player/store/playerStore"
import { useMediaSession } from "@/features/player/hooks/useMediaSession"
import { useTrackColor } from "@/features/player/hooks/useTrackColor"
import { useSeekInterval } from "@/features/player/hooks/useSeekInterval"

import { PlayerProps } from "./Player.props"

const CACHE_KEY = 'mingle_last_played';

const Player: React.FC<PlayerProps> = () => {
  const currentTrack = usePlayer(state => state.currentTrack);
  const playing = usePlayer(state => state.playing);
  const isQueueDrawerOpen = usePlayer(state => state.isQueueDrawerOpen);
  const setIsQueueDrawerOpen = usePlayer(state => state.setIsQueueDrawerOpen);
  const isLyricsDrawerOpen = usePlayer(state => state.isLyricsDrawerOpen);
  const setIsLyricsDrawerOpen = usePlayer(state => state.setIsLyricsDrawerOpen);
  const tracks = usePlayer(state => state.tracks);
  const playTrack = usePlayer(state => state.playTrack);
  const togglePlay = usePlayer(state => state.togglePlay);
  const handleSeek = usePlayer(state => state.handleSeek);
  const handleNextTrack = usePlayer(state => state.handleNextTrack);
  const handlePrevTrack = usePlayer(state => state.handlePrevTrack);
  const setCurrentTrack = usePlayer(state => state.setCurrentTrack);
  const setPlaying = usePlayer(state => state.setPlaying);
  const playlistIsPlaying = usePlayer(state => state.playlistIsPlaying);

  // ИНИЦИАЛИЗАЦИЯ ХУКОВ
  useMediaSession();
  useSeekInterval();
  const { dominantColor, rgb, accentColor } = useTrackColor(currentTrack);

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 640px)" });
  const [isClient, setIsClient] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Запрещаем Howler автоматически засыпать (стабильность паузы)
    Howler.autoSuspend = false;
    Howler.autoUnlock = true;
    Howler.html5PoolSize = 100;
  }, []);

  const currentTrackIndex = currentTrack ? tracks.findIndex(t => t.id === currentTrack.id) : -1;
  const nextTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[(currentTrackIndex + 1) % tracks.length] : null;
  const prevTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1] : null;

  // Сохранение в LocalStorage
  useEffect(() => {
    if (currentTrack && playlistIsPlaying) {
      let cache: { playlistId: string | number; trackId: string | number }[] = [];
      try {
        const cacheStr = localStorage.getItem(CACHE_KEY);
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch { }
      cache = cache.filter(item => String(item.playlistId) !== String(playlistIsPlaying.id));
      cache.unshift({ playlistId: playlistIsPlaying.id, trackId: currentTrack.id });
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache.slice(0, 10)));
    }
  }, [currentTrack, playlistIsPlaying]);

  return (
    <>
      <style>
        {`
        :root {
          --dominant-color: ${currentTrack?.color || dominantColor};
          --dominant-color-r: ${rgb[0]};
          --dominant-color-g: ${rgb[1]};
          --dominant-color-b: ${rgb[2]};
          --mg-accent-color: ${accentColor};
          --dominant-color-transparent: ${currentTrack?.color || dominantColor}10;  
          --dominant-background-color: ${currentTrack?.color || dominantColor}20;
        }
      `}
      </style>
      <div className={styles.playerWrapper}>
        <div
          className={styles.player}
          style={{
            "--dominant-color": currentTrack?.color || dominantColor,
            "--dominant-color-r": `${rgb[0]}`,
            "--dominant-color-g": `${rgb[1]}`,
            "--dominant-color-b": `${rgb[2]}`,
            "--mg-accent-color": accentColor,
          } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            crossOrigin="anonymous"
            ref={imgRef}
            src={currentTrack?.cover || "/placeholder.png"}
            alt=""
            style={{ display: "none" }}
          />

          {!isClient ? (
            <PlayerLoader />
          ) : (
            <AnimatePresence mode="wait">
              {!currentTrack ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <PlayerSkeleton />
                </motion.div>
              ) : (
                <motion.div
                  key="player-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  style={{ width: '100%' }}
                >
                  {isDesktopOrLaptop ? (
                    <PlayerControls
                      currentTrack={currentTrack}
                      nextTrack={nextTrack}
                      prevTrack={prevTrack}
                      playing={playing}
                      onPlayPause={togglePlay}
                      onPrevTrack={handlePrevTrack}
                      onNextTrack={handleNextTrack}
                      onSeek={handleSeek}
                      isDragging={false}
                      isQueueDrawerOpen={isQueueDrawerOpen}
                      setIsQueueDrawerOpen={setIsQueueDrawerOpen}
                      isLyricsDrawerOpen={isLyricsDrawerOpen}
                      setIsLyricsDrawerOpen={setIsLyricsDrawerOpen}
                      tracks={tracks}
                      onTrackSelect={playTrack}
                      playlistIsPlaying={playlistIsPlaying}
                      togglePlay={togglePlay}
                    />
                  ) : (
                    <MobilePlayer
                      currentTrack={currentTrack}
                      nextTrack={nextTrack}
                      prevTrack={prevTrack}
                      playing={playing}
                      onPlayPause={togglePlay}
                      onSeek={handleSeek}
                      onNextTrack={handleNextTrack}
                      onPrevTrack={handlePrevTrack}
                      tracks={tracks}
                      onTrackSelect={playTrack}
                      playlistIsPlaying={playlistIsPlaying}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  )
}

export default Player;