"use client"
import { motion } from "framer-motion"
import type { Playlist } from "@/types"
import Image from "next/image"
import styles from "./AnimatedHeader.module.css"
import { usePlayerStore as usePlayer } from "@/features/player/store/playerStore"
import { PlayPlaylistIcon } from '@/shared/ui/icons';
import { PausePlaylistIcon } from '@/shared/ui/icons';
import { Button } from "@/components/Button/Button"

type AnimatedHeaderProps = {
  playlist: Playlist
  visible: boolean
}

const AnimatedHeader = ({ playlist, visible }: AnimatedHeaderProps) => {
  const { playTrack, playPlaylist, playlistIsPlaying, togglePlay, currentTrack, playing } = usePlayer()

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
            src={playlist.cover || "/placeholder.svg"}
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
              <b>Now Playing:</b> {currentTrack?.title}
            </span>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
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
            className={styles.headerPlayButton}
          >
            <span className="material-symbols-outlined">
              {playlistIsPlaying?.id === playlist.id && playing ? <PlayPlaylistIcon /> : <PausePlaylistIcon />}
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AnimatedHeader
