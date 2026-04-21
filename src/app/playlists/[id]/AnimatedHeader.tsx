"use client"
import { motion } from "framer-motion"
import type { Playlist } from "@/types"
import Image from "next/image"
import styles from "./AnimatedHeader.module.css"
import { usePlayerStore as usePlayer } from "@/features/player/store/playerStore"
import { PlayPlaylistIcon } from '@/shared/ui/icons';
import { PausePlaylistIcon } from '@/shared/ui/icons';
import { Button } from "@/components/Button/Button"
import { TextMorph } from 'torph/react'
import { PlayButton } from '@/features/player/ui/PlaybackButtons/PlayButton'

type AnimatedHeaderProps = {
  playlist: Playlist
  visible: boolean
}

const AnimatedHeader = ({ playlist, visible }: AnimatedHeaderProps) => {
  const playTrack = usePlayer(state => state.playTrack);
  const playPlaylist = usePlayer(state => state.playPlaylist);
  const playlistIsPlaying = usePlayer(state => state.playlistIsPlaying);
  const togglePlay = usePlayer(state => state.togglePlay);
  const currentTrack = usePlayer(state => state.currentTrack);
  const playing = usePlayer(state => state.playing);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={styles.animatedHeader}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className={styles.headerContent}>
        <motion.div className={styles.coverContainer} variants={itemVariants}>
          <Image
            src={playlist.cover || "/placeholder.png"}
            alt={playlist.title}
            width={50}
            height={50}
            className={styles.miniCover}
          />
        </motion.div>

        <motion.div className={styles.titleInfo} variants={itemVariants}>
          <h2>{playlist.title}</h2>
          {playlistIsPlaying?.id === playlist.id && (
            <span className={styles.nowPlaying}>
              <b>Now Playing:</b> <TextMorph>{currentTrack?.title}</TextMorph>
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
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
            className={styles.headerPlayButton}

            variant="solo"
            style={{
              '--play-button-color': 'lch(from var(--playlist-dominant-color, #0f0f23) calc((49.44 - l) * infinity) 0 0)',
              '--play-button-background': 'var(--playlist-dominant-color)',
            } as React.CSSProperties}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AnimatedHeader
