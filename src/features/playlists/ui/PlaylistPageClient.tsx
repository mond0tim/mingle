"use client"
import { usePlayerStore as usePlayer } from "@/features/player/store/playerStore"
import type React from "react"

import { PlayButton } from '@/features/player/ui/PlaybackButtons/PlaybackButtons';
import styles from "@/features/playlists/ui/PlaylistPage.module.css"
import TrackList from "@/components/TrackList/TrackList"
import Image from "next/image"
import { Button } from "@/components/Button/Button"
import { useEffect, useState, useRef } from "react"
import ColorThief from "colorthief"
import { BackIcon } from '@/shared/ui/icons';
import { useRouter } from "next/navigation"
import { Playlist } from "@/types"
import AnimatedHeader from "@/features/playlists/ui/AnimatedHeader"
import { LikePlaylistButton } from "@/components/LikePlaylistButton/LikePlaylistButton"
import { TextMorph } from 'torph/react';
import { useAudioReactiveStore } from "@/features/audio-reactive-visualizer/store/audioReactiveStore"

type Props = {
  playlist: Playlist | null
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const PlaylistPageClient = ({ playlist }: Props) => {
  const playTrack = usePlayer(state => state.playTrack);
  const playPlaylist = usePlayer(state => state.playPlaylist);
  const playlistIsPlaying = usePlayer(state => state.playlistIsPlaying);
  const togglePlay = usePlayer(state => state.togglePlay);
  const currentTrack = usePlayer(state => state.currentTrack);
  const playing = usePlayer(state => state.playing);
  const [dominantColor, setDominantColor] = useState<string>("#000000")
  const [showHeader, setShowHeader] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const playlistRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (playlist?.colors) {
      useAudioReactiveStore.getState().setPageColors(playlist.colors);
      if (playlist.colors.dominant) {
        setDominantColor(playlist.colors.dominant);
      }
    } else if (imageRef.current && imageRef.current.complete) {
      extractDominantColor()
    }

    // Cleanup playlist color when leaving page
    return () => {
      useAudioReactiveStore.getState().setPageColors(null);
    }
  }, [playlist])

  useEffect(() => {
    const handleScroll = () => {
      if (playlistRef.current) {
        const playlistBottom = playlistRef.current.getBoundingClientRect().bottom
        setShowHeader(playlistBottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const extractDominantColor = () => {
    if (imageRef.current && !playlist?.colors) {
      const colorThief = new ColorThief()
      const color = colorThief.getColor(imageRef.current)
      const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      setDominantColor(colorString)
      useAudioReactiveStore.getState().setPageColors({ dominant: colorString })
    }
  }

  if (!playlist) {
    return <div className="p-5 md:ps-52 pr-4">Playlist not found</div>
  }

  return (

    <div className="p-5 pt-0 pr-4">
      <style>
        {`:root {--playlist-dominant-color: ${dominantColor}; --playlist-darken: color-mix(in srgb, ${dominantColor} 60%, black);}`}
      </style>
      {playlist && <AnimatedHeader playlist={playlist} visible={showHeader} />}

      <Button view="outline-solid" className={styles.back} onClick={() => router.back()}>
        <BackIcon />
      </Button>
      <div
        className={`${styles.playlist} bg-white/5 backdrop-blur-xl rounded-3xl mb-8 mt-5 border border-white/10`}
        ref={playlistRef}
        style={{
          backgroundColor: `color-mix(in srgb, var(--playlist-darken) 40%, transparent)`,
          borderColor: `color-mix(in srgb, var(--playlist-darken) 30%, transparent)`,
        }}
      >
        <div className="noise-overlay-transparent" />
        <div className={styles.title}>
          <h1>{playlist.title}</h1>
          {playlist.id !== 'liked-tracks' && (
            <div className="flex items-center gap-4 mt-4">
              <LikePlaylistButton playlistId={playlist.id} size={32} />
            </div>
          )}
          {playlistIsPlaying?.id === playlist.id && (
            <span className={styles.playing}>
              <b>Сейчас играет:</b> <TextMorph>{currentTrack?.title}</TextMorph>
            </span>
          )}
        </div>
        <Image
          ref={imageRef}
          src={playlist.cover || "/placeholder.png"}
          alt={playlist.title}
          width={200}
          height={200}
          className={styles.cover}
          onLoad={extractDominantColor}
        />
        <PlayButton
          isPlaying={playlistIsPlaying?.id === playlist.id && playing}
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (playlistIsPlaying?.id === playlist.id) {
              togglePlay()
            } else {
              await playPlaylist(playlist)
              if (playlist.tracks.length > 0) {
                await playTrack(playlist.tracks[0], playlist, true)
              }
            }
          }}
          className={styles.playButton}
          variant="solo"
          style={{
            '--play-button-color': 'lch(from var(--playlist-dominant-color, #0f0f23) calc((49.44 - l) * infinity) 0 0)',
            '--play-button-background': 'var(--playlist-dominant-color)',
          } as React.CSSProperties}
        />

      </div>
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10" style={{
        backgroundColor: `color-mix(in srgb, var(--playlist-darken) 40%, transparent)`,
        borderColor: `color-mix(in srgb, var(--playlist-darken) 30%, transparent)`,
      }}>
        <div className="noise-overlay-transparent" />
        <TrackList
          tracks={playlist.tracks}
          currentTrack={currentTrack}
          onTrackSelect={async (track) => {
            console.log("onTrackSelect called", track.title)
            await playPlaylist(playlist, track)
          }}
          trackItemMaxWidth="50vw"
        />
      </div>
    </div>
  )
}

export default PlaylistPageClient
