"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import ReactHowler from "react-howler"
import styles from "./Player.module.css"
import { useMediaQuery } from "react-responsive"
import PlayerControls from "./PlayerControls"
import MobilePlayer from "./MobilePlayer"
import PlayerLoader from "./PlayerLoader"
import ColorThief from "colorthief"
import { usePlayer } from "@/context/PlayerContext"

interface PlayerProps {
  color?: string; // Эта пропса не используется напрямую
}

const CACHE_KEY = 'mingle_last_played';

const Player: React.FC<PlayerProps> = () => {
  const {
    currentTrack,
    nextTrack,
    prevTrack,
    playing,
    duration,
    seek,
    isQueueDrawerOpen,
    setIsQueueDrawerOpen,
    isLyricsDrawerOpen,
    setIsLyricsDrawerOpen,
    howlerRef,
    tracks,
    playTrack,
    togglePlay,
    handleSeek,
    handleNextTrack,
    handlePrevTrack,
    handleOnEnd,
    setCurrentTrack,
    setPlaying,
    setDuration,
    setSeek,
    playlistIsPlaying,
  } = usePlayer()

  // State для работы с цветами обложки
  const [dominantColor, setDominantColor] = useState<string>("#0c0312")
  const [rgb, setRgb] = useState<[number, number, number]>([245, 245, 245])
  const [accentColor, setAccentColor] = useState<string>("#f5f5f5")
  
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 640px)" })
  const [isClient, setIsClient] = useState(false)
  
  const imgRef = useRef<HTMLImageElement>(null)
  
  useEffect(() => {
    setIsClient(true)
    setPlaying(false) // Синхронизируем начальное состояние воспроизведения
  }, [setPlaying])
  
  // EFFECT: Установка метаданных и обработчиков MediaSession  
  // Здесь мы обновляем данные только при изменении currentTrack (и playlist, если нужно)
  useEffect(() => {
    if (!currentTrack || typeof window === "undefined" || !("mediaSession" in navigator)) {
      return
    }
  
    console.log("MediaSession: Setting metadata and handlers for track:", currentTrack.title)
  
    const artwork = [
      {
        src: currentTrack.cover || "/placeholder.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ]
  
    try {
      // Задаём метаданные – они остаются до смены трека
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title || "Неизвестный трек",
        artist: currentTrack.artist || "Неизвестный исполнитель",
        album: playlistIsPlaying?.title || "",
        artwork,
      })
    } catch (error) {
      console.error("MediaSession: Error setting metadata", error)
    }
  
    // Устанавливаем обработчики действий
    // Рекомендуется, чтобы функции togglePlay, handlePrevTrack, handleNextTrack и handleSeek были мемоизированы
    try {
      navigator.mediaSession.setActionHandler("play", () => {
        togglePlay()
      })
      navigator.mediaSession.setActionHandler("pause", () => {
        togglePlay()
      })
      navigator.mediaSession.setActionHandler("previoustrack", handlePrevTrack)
      navigator.mediaSession.setActionHandler("nexttrack", handleNextTrack)
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime !== undefined && details.seekTime !== null) {
          handleSeek(details.seekTime)
        }
      })
    } catch (error) {
      console.error("MediaSession: Error setting action handlers", error)
    }
  
    // Обратите внимание: здесь мы выполняем очистку action handlers ТОЛЬКО при размонтировании компонента,
    // чтобы не сбрасывать метаданные при каждом обновлении состояния.
    return () => {
      if (typeof window !== "undefined" && "mediaSession" in navigator) {
        try {
          navigator.mediaSession.setActionHandler("play", null)
          navigator.mediaSession.setActionHandler("pause", null)
          navigator.mediaSession.setActionHandler("previoustrack", null)
          navigator.mediaSession.setActionHandler("nexttrack", null)
          navigator.mediaSession.setActionHandler("seekto", null)
        } catch (error) {
          console.error("MediaSession: Error cleaning up action handlers", error)
        }
      }
    }
    // Зависим только от currentTrack и playlistIsPlaying
  }, [currentTrack, playlistIsPlaying, handleNextTrack, handlePrevTrack, handleSeek, togglePlay])
  
  // EFFECT: Обновляем состояние воспроизведения (playbackState)  
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = playing ? "playing" : "paused"
    }
  }, [playing])
  
  // EFFECT: Периодическое обновление позиции воспроизведения  
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
  
    if (playing && howlerRef.current && typeof window !== "undefined" && "mediaSession" in navigator) {
      intervalId = setInterval(() => {
        if (howlerRef.current) {
          try {
            const currentSeek = howlerRef.current.seek() as number
            const currentDuration = howlerRef.current.duration()
  
            if (!isNaN(currentSeek) && currentDuration && currentDuration > 0 && !isNaN(currentDuration)) {
              setSeek(currentSeek)
              navigator.mediaSession.setPositionState({
                duration: currentDuration,
                playbackRate: 1.0,
                position: currentSeek,
              })
            }
          } catch (error) {
            console.error("MediaSession: Error updating positionState:", error)
          }
        }
      }, 1000)
    }
  
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [playing, howlerRef, setSeek, duration])
  
  // EFFECT: Извлечение цвета обложки через ColorThief
  useEffect(() => {
    const getDominantColor = () => {
      if (currentTrack && currentTrack.cover && imgRef.current) {
        const colorThief = new ColorThief()
        const img = imgRef.current
  
        const handleImageLoad = () => {
          try {
            const color = colorThief.getColor(img)
            const finalColor = currentTrack.color ? hexToRgb(currentTrack.color) : color
            const hexColor = `#${finalColor.map((x: number) => x.toString(16).padStart(2, "0")).join("")}`
            const [r, g, b] = finalColor
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
            const isLight = luminance > 128
  
            setAccentColor(isLight ? darkenColor(finalColor, 0.5) : lightenColor(finalColor, 0.7))
            setDominantColor(hexColor)
            setRgb([r, g, b])
          } catch (error) {
            console.error("Failed to extract color:", error)
            setDominantColor("#0f0f23")
            setRgb([245, 245, 245])
            setAccentColor("#f5f5f5")
          }
        }
  
        img.onerror = () => {
          console.error("Image failed to load for color extraction:", currentTrack.cover)
          setDominantColor("#0f0f23")
          setRgb([245, 245, 245])
          setAccentColor("#f5f5f5")
        }
  
        if (img.complete && img.naturalHeight !== 0) {
          handleImageLoad()
        } else if (!img.complete) {
          img.onload = handleImageLoad
        } else {
          console.error("Image failed to load for color extraction:", currentTrack.cover)
          setDominantColor("#0c0312")
          setRgb([245, 245, 245])
          setAccentColor("#f5f5f5")
        }
      } else {
        setDominantColor("#f5f5f5")
        setRgb([245, 245, 245])
        setAccentColor("#0c0312")
      }
    }
  
    const timeoutId = setTimeout(getDominantColor, 50)
    return () => clearTimeout(timeoutId)
  }, [currentTrack])
  
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
      } catch {}
      // Удаляем дубликаты
      cache = cache.filter(item => item.playlistId !== playlistIsPlaying.id);
      cache.unshift({ playlistId: playlistIsPlaying.id, trackId: currentTrack.id });
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache.slice(0, 10)));
    }
  }, [currentTrack, playlistIsPlaying]);
  
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)] : [0, 0, 0]
  }
  
  const darkenColor = (color: [number, number, number], amount: number): string => {
    const [r, g, b] = color
    return `#${[r, g, b]
      .map((c) =>
        Math.max(0, Math.round(c - c * amount))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")}`
  }
  
  const lightenColor = (color: [number, number, number], amount: number): string => {
    const [r, g, b] = color
    return `#${[r, g, b]
      .map((c) =>
        Math.min(255, Math.round(c + (255 - c) * amount))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")}`
  }
  
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
            duration={duration}
            seek={seek}
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
            duration={duration}
            seek={seek}
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
