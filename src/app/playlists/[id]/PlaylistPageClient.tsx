"use client"
import { usePlayerStore as usePlayer } from "@/features/player/store/playerStore"
import type React from "react"

import { PlayPlaylistIcon } from '@/shared/ui/icons';
import { PausePlaylistIcon } from '@/shared/ui/icons';
import styles from "./Page.module.css"
import TrackList from "@/components/TrackList/TrackList"
import Image from "next/image"
import { Button } from "@/components/Button/Button"
import { useEffect, useState, useRef } from "react"
import ColorThief from "colorthief"
import { BackIcon } from '@/shared/ui/icons';
import { useRouter } from "next/navigation"
import type { Playlist } from "@/types"
import AnimatedHeader from "./AnimatedHeader"

type Props = {
  playlist: Playlist | null
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const PlaylistPageClient = ({ playlist }: Props) => {
  const { playTrack, playPlaylist, playlistIsPlaying, togglePlay, currentTrack, playing } = usePlayer()
  const [dominantColor, setDominantColor] = useState<string>("#000000")
  const [showHeader, setShowHeader] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const playlistRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      extractDominantColor()
    }
  }, [playlist?.id])

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
    if (imageRef.current) {
      const colorThief = new ColorThief()
      const color = colorThief.getColor(imageRef.current)
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)
    }
  }

  if (!playlist) {
    return <div className="p-5 md:ps-52 pr-4">Playlist not found</div>
  }

  return (

    <div className="p-5 md:ps-52 pr-4">
      <style>
        {`:root {--playlist-dominant-color: ${dominantColor}}`}
      </style>
      {playlist && <AnimatedHeader playlist={playlist} visible={showHeader} />}

      <div
        className={styles.playlist_gradient}
        style={{ "--playlist-dominant-color": dominantColor } as React.CSSProperties}
      ></div>
      <Button view="outline-solid" className={styles.back} onClick={() => router.back()}>
        <BackIcon />
      </Button>
      <div className={styles.playlist} ref={playlistRef}>
        <div className={styles.title}>
          <h1>{playlist.title}</h1>
          {playlistIsPlaying?.id === playlist.id && (
            <span className={styles.playing}>
              <b>Now Playing:</b> {currentTrack?.title}
            </span>
          )}
        </div>
        <Image
          ref={imageRef}
          src={playlist.cover || "/placeholder.svg"}
          alt={playlist.title}
          width={200}
          height={200}
          className={styles.cover}
          onLoad={extractDominantColor}
        />
        <Button
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
        >
          <span className="material-symbols-outlined">
            {playlistIsPlaying?.id === playlist.id && playing ? <PlayPlaylistIcon /> : <PausePlaylistIcon />}
          </span>
        </Button>
      </div>
      <TrackList
        tracks={playlist.tracks}
        currentTrack={currentTrack}
        onTrackSelect={async (track) => {
          console.log("onTrackSelect called", track.title)
          await playPlaylist(playlist, track)
        }}
        trackItemMaxWidth="50vw"
        numbered={true}
      />
    </div>
  )
}

export default PlaylistPageClient
