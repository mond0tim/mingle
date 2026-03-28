"use client"

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from "react"
import type ReactHowler from "react-howler"
import type { Track, Playlist } from "@/types"

interface PlayerContextProps {
  currentTrack: Track | null
  nextTrack: Track | null
  prevTrack: Track | null
  playing: boolean
  duration: number
  seek: number
  howlerState: string
  isQueueDrawerOpen: boolean
  setIsQueueDrawerOpen: (isOpen: boolean) => void
  isLyricsDrawerOpen: boolean
  setIsLyricsDrawerOpen: (isOpen: boolean) => void
  playlistIsPlaying: Playlist | null
  howlerRef: React.RefObject<ReactHowler>
  audioContext: React.RefObject<AudioContext | null>
  audioNode: React.RefObject<MediaElementAudioSourceNode | null>
  tracks: Track[]
  playTrack: (track: Track, playlist?: Playlist, autoplay?: boolean) => Promise<void>
  playPlaylist: (playlist: Playlist, track?: Track) => Promise<void>
  togglePlay: () => void
  handleSeek: (seek: number) => void
  handleNextTrack: () => void
  handlePrevTrack: () => void
  handleOnEnd: () => void
  setCurrentTrack: (track: Track | null) => void
  setPlaying: (playing: boolean) => void
  setDuration: (duration: number) => void
  setSeek: (seek: number) => void
  setTracks: (tracks: Track[]) => void
  setHowlerState: (state: string) => void
  isMuted: boolean
  toggleMute: () => void
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined)

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}

interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [playing, setPlaying] = useState(false)
  const howlerRef = useRef<ReactHowler>(null)
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)
  const [howlerState, setHowlerState] = useState<string>("unloaded")
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false)
  const [isLyricsDrawerOpen, setIsLyricsDrawerOpen] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [isMuted, setIsMuted] = useState(false)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      console.log(`toggleMute: Переключение mute на ${!prev}`)
      return !prev
    })
  }, [])

  const audioContext = useRef<AudioContext | null>(null)
  const audioNode = useRef<MediaElementAudioSourceNode | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && !audioContext.current) {
      audioContext.current = new AudioContext()
      console.log("AudioContext создан")
    }
  }, [])

  useEffect(() => {
    if (howlerRef.current && howlerRef.current.howler && audioContext.current) {
      const sound = howlerRef.current.howler
      if (!audioNode.current) {
        console.log("Создание audioNode для Howler")
        audioNode.current = audioContext.current.createMediaElementSource(sound._sounds[0]?._node)
        audioNode.current.connect(audioContext.current.destination)
        console.log("audioNode успешно подключен")
      }
    }
    return () => {
      if (audioNode.current) {
        console.log("Отключение audioNode")
        audioNode.current.disconnect()
        audioNode.current = null
      }
    }
  }, [howlerRef, audioContext])

  useEffect(() => {
    if (howlerRef.current && howlerRef.current.howler) {
      console.log(`Применение mute: ${isMuted}`)
      howlerRef.current.howler.mute(isMuted)
    }
  }, [isMuted, howlerRef])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (playing && howlerRef.current) {
      console.log("Начало интервала обновления seek")
      intervalId = setInterval(() => {
        if (howlerRef.current) {
          const currentSeek = howlerRef.current.seek() as number
          if (!isNaN(currentSeek)) {
            setSeek(currentSeek)
          }
        }
      }, 100)
    }
    return () => {
      if (intervalId) {
        console.log("Очистка интервала обновления seek")
        clearInterval(intervalId)
      }
    }
  }, [playing, howlerRef])

  useEffect(() => {
    const handleHowlerStateChange = () => {
      if (howlerRef.current && howlerRef.current.howler) {
        const state = howlerRef.current.howler.state()
        console.log(`Состояние Howler изменилось: ${state}`)
        setHowlerState(state)
      }
    }

    const currentHowlerRef = howlerRef.current
    if (currentHowlerRef && currentHowlerRef.howler) {
      console.log("Подписка на события Howler (load, play, pause, stop, end)")
      currentHowlerRef.howler.on("load", handleHowlerStateChange)
      currentHowlerRef.howler.on("play", handleHowlerStateChange)
      currentHowlerRef.howler.on("pause", handleHowlerStateChange)
      currentHowlerRef.howler.on("stop", handleHowlerStateChange)
      currentHowlerRef.howler.on("end", handleHowlerStateChange)
      handleHowlerStateChange()
    }
    return () => {
      if (currentHowlerRef && currentHowlerRef.howler) {
        console.log("Отписка от событий Howler")
        currentHowlerRef.howler.off("load", handleHowlerStateChange)
        currentHowlerRef.howler.off("play", handleHowlerStateChange)
        currentHowlerRef.howler.off("pause", handleHowlerStateChange)
        currentHowlerRef.howler.off("stop", handleHowlerStateChange)
        currentHowlerRef.howler.off("end", handleHowlerStateChange)
      }
    }
  }, [howlerRef])

  const playTrack = useCallback(
    async (track: Track, playlist?: Playlist, autoplay = true) => {
      console.log(`playTrack: Выбран трек "${track.title}"`)
      if (howlerRef.current) {
        console.log("playTrack: Остановка текущего трека")
        howlerRef.current.stop()
      }
      setCurrentTrack(track)
      if (playlist) {
        console.log("playTrack: Установка плейлиста")
        setCurrentPlaylist(playlist)
        setTracks(playlist.tracks)
      }
      console.log(`playTrack: Установка состояния playing: ${autoplay}`)
      setPlaying(autoplay)
    },
    [howlerRef],
  )

  const playPlaylist = useCallback(
    async (playlist: Playlist, track?: Track) => {
      console.log("playPlaylist: Установка плейлиста")
      setCurrentPlaylist(playlist)
      setTracks(playlist.tracks)
      if (playlist.tracks.length > 0) {
        const trackToPlay = track ? track : playlist.tracks[0]
        console.log(`playPlaylist: Воспроизведение трека "${trackToPlay.title}"`)
        await playTrack(trackToPlay, playlist, true)
      } else {
        console.log("playPlaylist: Плейлист пуст, остановка воспроизведения")
        setPlaying(false)
      }
    },
    [playTrack],
  )

  const togglePlay = useCallback(() => {
    console.log(`togglePlay: Переключение состояния playing на ${!playing}`)
    setPlaying((prev) => !prev)
  }, [playing])

  const handleSeek = useCallback(
    (newSeek: number) => {
      console.log(`handleSeek: Перемотка на ${newSeek} секунд`)
      if (howlerRef.current) {
        howlerRef.current.seek(newSeek)
        setSeek(newSeek)
      }
    },
    [howlerRef],
  )

  const handleNextTrack = useCallback(() => {
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length
      console.log(`handleNextTrack: Переход от трека ${currentTrackIndex} к ${nextTrackIndex}`)
      playTrack(tracks[nextTrackIndex], currentPlaylist ?? undefined)
    }
  }, [currentTrack, tracks, playTrack, currentPlaylist])

  const handlePrevTrack = useCallback(() => {
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const prevTrackIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
      console.log(`handlePrevTrack: Переход от трека ${currentTrackIndex} к ${prevTrackIndex}`)
      playTrack(tracks[prevTrackIndex], currentPlaylist ?? undefined)
    }
  }, [currentTrack, tracks, playTrack, currentPlaylist])

  const handleOnEnd = useCallback(() => {
    console.log("handleOnEnd: Текущий трек завершён")
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      if (currentTrackIndex < tracks.length - 1) {
        console.log(`handleOnEnd: Переход к следующему треку: ${currentTrackIndex + 1}`)
        playTrack(tracks[currentTrackIndex + 1], currentPlaylist ?? undefined)
      } else {
        if (currentPlaylist) {
          console.log("handleOnEnd: Воспроизведение с начала плейлиста")
          playTrack(currentPlaylist.tracks[0], currentPlaylist)
        } else {
          console.log("handleOnEnd: Нет следующего трека, остановка воспроизведения")
          setPlaying(false)
        }
      }
    } else {
      console.log("handleOnEnd: Нет трека, остановка воспроизведения")
      setPlaying(false)
    }
  }, [currentTrack, tracks, playTrack, currentPlaylist])

  // Логика для определения следующего и предыдущего треков
  const getNextAndPrevTracks = useCallback(() => {
    if (!currentTrack || tracks.length <= 1) {
      return { nextTrack: null, prevTrack: null }
    }

    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    if (currentIndex === -1) {
      return { nextTrack: null, prevTrack: null }
    }

    const nextIndex = (currentIndex + 1) % tracks.length
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1

    return {
      nextTrack: tracks[nextIndex],
      prevTrack: tracks[prevIndex],
    }
  }, [currentTrack, tracks])

  const { nextTrack, prevTrack } = useMemo(() => getNextAndPrevTracks(), [getNextAndPrevTracks])

  const value = useMemo(
    () => ({
      currentTrack,
      nextTrack,
      prevTrack,
      playing,
      duration,
      seek,
      howlerState,
      isQueueDrawerOpen,
      setIsQueueDrawerOpen,
      isLyricsDrawerOpen,
      setIsLyricsDrawerOpen,
      playlistIsPlaying: currentPlaylist,
      howlerRef,
      audioContext,
      audioNode,
      tracks,
      playTrack,
      playPlaylist,
      togglePlay,
      handleSeek,
      handleNextTrack,
      handlePrevTrack,
      handleOnEnd,
      setCurrentTrack,
      setPlaying,
      setDuration,
      setSeek,
      setTracks,
      setHowlerState,
      isMuted,
      toggleMute,
    }),
    [
      currentTrack,
      nextTrack,
      prevTrack,
      playing,
      duration,
      seek,
      howlerState,
      isQueueDrawerOpen,
      isLyricsDrawerOpen,
      currentPlaylist,
      howlerRef,
      audioContext,
      audioNode,
      tracks,
      playTrack,
      playPlaylist,
      togglePlay,
      handleSeek,
      handleNextTrack,
      handlePrevTrack,
      handleOnEnd,
      isMuted,
      toggleMute,
    ],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
