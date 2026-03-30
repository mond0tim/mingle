"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Howler } from "howler"
import styles from "./Player.module.css"
import { useMediaQuery } from "react-responsive"

import PlayerControls from "../PlayerControls"
import MobilePlayer from "../MobilePlayer"
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
    // Убеждаемся, что плеер стартует на паузе
    setPlaying(false);

    // Запрещаем Howler автоматически засыпать (стабильность паузы)
    Howler.autoSuspend = false;
    Howler.autoUnlock = true;
    Howler.html5PoolSize = 100;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentTrackIndex = currentTrack ? tracks.findIndex(t => t.id === currentTrack.id) : -1;
  const nextTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[(currentTrackIndex + 1) % tracks.length] : null;
  const prevTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1] : null;

  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks, setCurrentTrack, currentTrack]);

  // Сохранение в LocalStorage
  useEffect(() => {
    if (currentTrack && playlistIsPlaying) {
      let cache: { playlistId: number; trackId: number }[] = [];
      try {
        const cacheStr = localStorage.getItem(CACHE_KEY);
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch { }
      cache = cache.filter(item => item.playlistId !== playlistIsPlaying.id);
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
        }
      `}
      </style>
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
          src={currentTrack?.cover || "/placeholder.svg"}
          alt=""
          style={{ display: "none" }}
        />

        {!isClient && <PlayerLoader />}

        {isClient && isDesktopOrLaptop && (
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
        )}

        {isClient && !isDesktopOrLaptop && (
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
      </div>
    </>
  )
}

export default Player;