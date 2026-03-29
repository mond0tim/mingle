"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import ReactHowler from "react-howler"
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
  const howlerRef = usePlayer(state => state.howlerRef);
  const tracks = usePlayer(state => state.tracks);
  const playTrack = usePlayer(state => state.playTrack);
  const togglePlay = usePlayer(state => state.togglePlay);
  const handleSeek = usePlayer(state => state.handleSeek);
  const handleNextTrack = usePlayer(state => state.handleNextTrack);
  const handlePrevTrack = usePlayer(state => state.handlePrevTrack);
  const handleOnEnd = usePlayer(state => state.handleOnEnd);
  const setCurrentTrack = usePlayer(state => state.setCurrentTrack);
  const setPlaying = usePlayer(state => state.setPlaying);
  const setDuration = usePlayer(state => state.setDuration);
  const playlistIsPlaying = usePlayer(state => state.playlistIsPlaying);
  const volume = usePlayer(state => state.volume);
  const isMuted = usePlayer(state => state.isMuted);

  // ИНИЦИАЛИЗАЦИЯ ХУКОВ
  useMediaSession(); // Вызов переписанного и стабильного хука
  useSeekInterval();
  const { dominantColor, rgb, accentColor } = useTrackColor(currentTrack);

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 640px)" });
  const [isClient, setIsClient] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsClient(true);
    setPlaying(false);

    // Блокируем авто-сон движка для стабильной работы паузы в браузере
    Howler.autoSuspend = false;

    // Глобальные настройки самовосстановления Howler
    Howler.autoUnlock = true;
    Howler.html5PoolSize = 100; // Решает ошибку: HTML5 Audio pool exhausted
  }, [setPlaying]);

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

        {/* Ключ (key) здесь спасает от багов, гарантируя, что старый трек полностью уничтожен при смене */}
        {currentTrack && (
          <ReactHowler
            src={currentTrack.src}
            playing={playing}
            onEnd={handleOnEnd}
            ref={howlerRef}
            preload={true}
            html5={true} // Обязательно для потоков и MediaSession
            volume={isMuted ? 0 : volume}
            onLoad={() => {
              if (howlerRef.current) {
                const loadedDuration = howlerRef.current.duration();
                if (!isNaN(loadedDuration) && loadedDuration > 0) {
                  setDuration(loadedDuration);

                  // Синхронизируем базовую позицию 0:00 в ОС
                  if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
                    try {
                      navigator.mediaSession.setPositionState({
                        duration: loadedDuration,
                        playbackRate: 1,
                        position: 0
                      });
                    } catch (e) { }
                  }
                }
              }
            }}
            onLoadError={(id, error) => {
              console.error("Howler load error:", id, error);
            }}
            onPlayError={(id, error) => {
              console.error("Howler play error:", id, error);
            }}
          />
        )}

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
            howlerRef={howlerRef}
            playlistIsPlaying={playlistIsPlaying}
          />
        )}
      </div>
    </>
  )
}

export default Player;