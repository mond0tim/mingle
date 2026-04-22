"use client"
import type React from "react"
import { type RefObject, useState, useRef, useEffect } from "react"
import type { Playlist, Track } from "@/types"
import styles from "./MobilePlayer.module.css"
import ExpandedControlsDrawer from "../ExpandedControlsDrawer"
import Image from "next/image"
import cn from "classnames"
import { motion, type PanInfo, useMotionValue, useTransform, animate } from "framer-motion"
import { PlayIcon } from '@/shared/ui/icons';
import { PauseIcon } from '@/shared/ui/icons';
import { LikeButton } from '@/components/LikeButton/LikeButton';

import { MobilePlayerProps } from "./MobilePlayer.props"

import { usePlayerStore } from "../../store/playerStore"
import { PlayButton } from "../PlaybackButtons/PlaybackButtons"

const MobilePlayer: React.FC<MobilePlayerProps> = ({
  currentTrack,
  nextTrack,
  prevTrack,
  playing,
  onPlayPause,
  onSeek,
  onNextTrack,
  onPrevTrack,
  tracks,
  onTrackSelect,
  playlistIsPlaying,
}) => {
  const seek = usePlayerStore(state => state.seek)
  const duration = usePlayerStore(state => state.duration)
  const [isExpandedDrawerOpen, setIsExpandedDrawerOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragConstraintsRef = useRef(null)

  const [isSeeking, setIsSeeking] = useState(false)
  const [seekValue, setSeekValue] = useState(seek)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSeeking) setSeekValue(seek)
  }, [seek, isSeeking])

  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleSeekMove(e)
    window.addEventListener("mousemove", handleSeekMoveWin as EventListener)
    window.addEventListener("mouseup", handleSeekEndWin as EventListener)
    window.addEventListener("touchmove", handleSeekMoveWin as EventListener)
    window.addEventListener("touchend", handleSeekEndWin as EventListener)
  }

  const handleSeekMoveWin = (e: Event) => {
    if (e instanceof MouseEvent || e instanceof TouchEvent) {
      handleSeekMove(e)
    }
  }
  const handleSeekEndWin = (e: Event) => {
    if (e instanceof MouseEvent || e instanceof TouchEvent) {
      handleSeekEnd(e)
    }
  }

  const handleSeekMove = (
    e: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    let clientX: number | undefined
    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else if ("clientX" in e) {
      clientX = e.clientX
    }
    if (!progressBarRef.current || typeof clientX !== "number") return
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const newSeek = (x / rect.width) * duration
    setSeekValue(newSeek)
  }

  const handleSeekEnd = (e: MouseEvent | TouchEvent) => {
    setIsSeeking(false)
    let clientX: number | undefined
    if ("changedTouches" in e) {
      clientX = e.changedTouches[0].clientX
    } else if ("clientX" in e) {
      clientX = e.clientX
    }
    let finalSeek = seekValue
    if (progressBarRef.current && typeof clientX === "number") {
      const rect = progressBarRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      finalSeek = (x / rect.width) * duration
      setSeekValue(finalSeek)
    }
    window.removeEventListener("mousemove", handleSeekMoveWin as EventListener)
    window.removeEventListener("mouseup", handleSeekEndWin as EventListener)
    window.removeEventListener("touchmove", handleSeekMoveWin as EventListener)
    window.removeEventListener("touchend", handleSeekEndWin as EventListener)
    onSeek(finalSeek)
  }

  // Motion values for the drag animation
  const x = useMotionValue(0)

  // Transform values for current track
  const currentTrackX = x
  const currentTrackOpacity = useTransform(x, [-260, -150, 0, 150, 260], [0, 0.3, 1, 0.3, 0])

  // Transform values for adjacent tracks
  const nextTrackX = useTransform(x, [-260, 0], [0, 260])
  const prevTrackX = useTransform(x, [0, 260], [-260, 0])
  const nextTrackOpacity = useTransform(x, [-260, -150, -50, 0], [1, 0.6, 0.1, 0])
  const prevTrackOpacity = useTransform(x, [0, 50, 150, 260], [0, 0.1, 0.6, 1])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100 // Minimum distance to trigger track change

    if (info.offset.x > threshold && prevTrack) {
      // Swiped right - go to previous track
      animate(x, 300, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          onPrevTrack()
          x.set(0) // Reset position after track change
        },
      })
    } else if (info.offset.x < -threshold && nextTrack) {
      // Swiped left - go to next track
      animate(x, -300, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          onNextTrack()
          x.set(0) // Reset position after track change
        },
      })
    } else {
      // Not enough distance - animate back to center
      animate(x, 0, {
        type: "spring",
        stiffness: 500,
        damping: 50,
      })
    }

    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleClick = () => {
    if (!isDragging) {
      setIsExpandedDrawerOpen(true)
    }
  }

  return (
    <div className={styles.mobilePlayer} ref={dragConstraintsRef}>
      {currentTrack && (
        <>
          <div className={styles.mobilePlayerContainer}>
            <div className={styles.mobilePlayerMask}>
              {/* Previous Track */}
              {prevTrack && (
                <motion.div
                  className={styles.adjacentTrackPreview}
                  style={{
                    x: prevTrackX,
                    opacity: prevTrackOpacity,
                    zIndex: 1,
                  }}
                >
                  <div className={styles.mobilePlayerTrackContent}>
                    <Image
                      src={prevTrack.cover || "/no-cover.jpg"}
                      alt={prevTrack.title}
                      width={45}
                      height={45}
                      className={styles.mobilePlayerCover}
                    />
                    <div className={styles.mobilePlayerInfoMini}>
                      <div className={styles.trackTitle}>{prevTrack.title}</div>
                      <div className={styles.trackArtist}>{prevTrack.artist}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Current Track */}
              <motion.div
                className={styles.mobilePlayerTrackWrapper}
                onClick={handleClick}
                drag="x"
                dragConstraints={dragConstraintsRef}
                dragElastic={0.9}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{ x: currentTrackX }}
              >
                <motion.div className={styles.mobilePlayerTrackContent} style={{ opacity: currentTrackOpacity }}>
                  <Image
                    src={currentTrack.cover || "/no-cover.jpg"}
                    alt={currentTrack.title}
                    width={45}
                    height={45}
                    className={styles.mobilePlayerCover}
                  />
                  <div className={styles.mobilePlayerInfoMini}>
                    <div className={styles.trackTitle}>{currentTrack.title}</div>
                    <div className={styles.trackArtist}>{currentTrack.artist}</div>
                  </div>

                </motion.div>
              </motion.div>

              {/* Next Track */}
              {nextTrack && (
                <motion.div
                  className={styles.adjacentTrackPreview}
                  style={{
                    x: nextTrackX,
                    opacity: nextTrackOpacity,
                    zIndex: 1,
                  }}
                >
                  <div className={styles.mobilePlayerTrackContent}>
                    <Image
                      src={nextTrack.cover || "/no-cover.jpg"}
                      alt={nextTrack.title}
                      width={45}
                      height={45}
                      className={styles.mobilePlayerCover}
                    />
                    <div className={styles.mobilePlayerInfoMini}>
                      <div className={styles.trackTitle}>{nextTrack.title}</div>
                      <div className={styles.trackArtist}>{nextTrack.artist}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            {/* Fixed elements that don't move during swipe */}
            <div className={styles.mobilePlayerFixedElements}>
              <div className="flex items-center ml-auto pr-2">
                <LikeButton trackId={currentTrack.id} size={18} className="opacity-80" />
              </div>
              <PlayButton
                isPlaying={playing}
                onClick={(e) => {
                  e.stopPropagation()
                  onPlayPause()
                }}
                variant="solo-mini"
                className={styles.play_button}
                style={{
                  '--play-button-background': 'lch(from var(--dominant-color, #0f0f23) calc((49.44 - l) * infinity) 0 0)',
                  '--play-button-color': 'var(--dominant-color, #0f0f23)',
                } as React.CSSProperties}
              />

              <div
                className={styles.mobileProgressBarContainer}
                ref={progressBarRef}
                onMouseDown={handleSeekStart}
                onTouchStart={handleSeekStart}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={styles.mobileProgressBar}
                  style={{
                    width: `${duration > 0 ? ((isSeeking ? seekValue : seek) / duration) * 100 : 0}%`,
                  }}
                />
                <div
                  className={styles.progressThumb}
                  style={{
                    left: `${duration > 0 ? ((isSeeking ? seekValue : seek) / duration) * 100 : 0}%`,
                    transition: isSeeking ? "none" : undefined,
                  }}
                />
              </div>


            </div>
          </div>

          <ExpandedControlsDrawer
            isDrawerOpen={isExpandedDrawerOpen}
            setIsDrawerOpen={setIsExpandedDrawerOpen}
            currentTrack={currentTrack}
            prevTrack={prevTrack}
            nextTrack={nextTrack}
            playing={playing}
            onPlayPause={onPlayPause}
            onSeek={onSeek}
            onNextTrack={onNextTrack}
            onPrevTrack={onPrevTrack}
            tracks={tracks}
            onTrackSelect={onTrackSelect}
            playlistIsPlaying={playlistIsPlaying}
          />
        </>
      )}
    </div>
  )
}

export default MobilePlayer
