"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import ReactHowler from "react-howler"
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

  // Инициализируем отдельные хуки для Media Session и извлечения цветов
  useMediaSession()
  useSeekInterval() // Polls Howler every 100ms to update seek + duration in store
  const { dominantColor, rgb, accentColor } = useTrackColor(currentTrack)

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 640px)" })
  const [isClient, setIsClient] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setIsClient(true)
    setPlaying(false) // Синхронизируем начальное состояние воспроизведения
  }, [setPlaying])

  const currentTrackIndex = currentTrack ? tracks.findIndex(t => t.id === currentTrack.id) : -1;
  const nextTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[(currentTrackIndex + 1) % tracks.length] : null;
  const prevTrack = currentTrackIndex !== -1 && tracks.length > 0 ? tracks[currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1] : null;

  // Если трек ещё не выбран, выбираем первый из списка
  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setCurrentTrack(tracks[0])
    }
  }, [tracks, setCurrentTrack, currentTrack])

  // Сохраняем в localStorage при смене трека или плейлиста
  useEffect(() => {
    if (currentTrack && playlistIsPlaying) {
      let cache: { playlistId: number; trackId: number }[] = [];
      try {
        const cacheStr = localStorage.getItem(CACHE_KEY);
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch { }
      // Удаляем дубликаты
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
        {/* <div className={styles.player_background}></div>
        Скрытое изображение для ColorThief */}
        { /* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          crossOrigin="anonymous"
          ref={imgRef}
          src={currentTrack?.cover || "/placeholder.svg"}
          alt=""
          style={{ display: "none" }}
        />
        {/* ReactHowler для воспроизведения аудио */}
        {currentTrack && (
          <ReactHowler
            src={currentTrack.src}
            playing={playing}
            onEnd={handleOnEnd}
            ref={howlerRef}

            preload={true}
            volume={isMuted ? 0 : volume}
            onLoad={() => {
              if (howlerRef.current) {
                const loadedDuration = howlerRef.current.duration()
                if (!isNaN(loadedDuration) && loadedDuration > 0) {
                  setDuration(loadedDuration)
                  if ("mediaSession" in navigator && navigator.mediaSession.metadata) {
                    try {
                      navigator.mediaSession.setPositionState({
                        duration: loadedDuration,
                        playbackRate: 1.0,
                        position: 0,
                      })
                    } catch (error) {
                      console.error("MediaSession: Error setting initial position state on load", error)
                    }
                  }
                } else {
                  console.warn("Howler reported invalid duration on load:", loadedDuration)
                }
              }
            }}
            onLoadError={(id, error) => {
              console.error("Howler load error:", id, error)
            }}
            onPlayError={(id, error) => {
              console.error("Howler play error:", id, error)
            }}
          />
        )}

        {/* Отображение лоадера и контролов */}
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

export default Player
