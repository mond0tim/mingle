/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
// import type { Playlist, Track } from "@/types"
import styles from "../Player.module.css"
import { Drawer } from "vaul"
import QueueDrawer from "../QueueDrawer"
import LyricsDrawer from "../LyricsDrawer"
import Image from "next/image"
import { Button } from "@/components/Button/Button"
import { NextIcon } from '@/shared/ui/icons';
import { PrevIcon } from '@/shared/ui/icons';
import { QueueIcon } from '@/shared/ui/icons';
import { MoreIcon } from '@/shared/ui/icons';
import { TextIcon as LyricsIcon } from '@/shared/ui/icons';
import cn from "classnames"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { motion, type PanInfo, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from 'lucide-react'

import { ExpandedControlsDrawerProps } from "./ExpandedControlsDrawer.props"

import { usePlayerStore } from "../../store/playerStore"

const CurrentTime: React.FC<{ isSeeking: boolean; seekValue: number }> = ({ isSeeking, seekValue }) => {
  const seek = usePlayerStore((state) => state.seek);

  const formatTime = (seconds: number) => (
    <NumberFlowGroup>
      <div
        style={{ fontVariantNumeric: "tabular-nums", "--number-flow-char-height": "0.85em" } as React.CSSProperties}
        className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
      >
        <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
        <NumberFlow
          prefix=":"
          trend={1}
          value={Math.floor(seconds % 60)}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          transformTiming={{ duration: 370 }}
        />
      </div>
    </NumberFlowGroup>
  );

  return <span className={styles.driverCurrentTime}>{formatTime(isSeeking ? seekValue : seek)}</span>;
};

const DurationTime: React.FC = () => {
  const duration = usePlayerStore((state) => state.duration);

  const formatTime = (seconds: number) => (
    <NumberFlowGroup>
      <div
        style={{ fontVariantNumeric: "tabular-nums", "--number-flow-char-height": "0.85em" } as React.CSSProperties}
        className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
      >
        <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
        <NumberFlow
          prefix=":"
          trend={1}
          value={Math.floor(seconds % 60)}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          transformTiming={{ duration: 370 }}
        />
      </div>
    </NumberFlowGroup>
  );

  return <span className={styles.driverDuration}>{formatTime(duration)}</span>;
};

const ProgressBar: React.FC<{
  isSeeking: boolean;
  seekValue: number;
  onSeekStart: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
}> = ({ isSeeking, seekValue, onSeekStart }) => {
  const seek = usePlayerStore((state) => state.seek);
  const duration = usePlayerStore((state) => state.duration);

  const currentPos = isSeeking ? seekValue : seek;
  const progress = duration > 0 ? (currentPos / duration) * 100 : 0;

  return (
    <div
      className={styles.playerProgress}
      id="player-progress-bar"
      onMouseDown={onSeekStart}
      onTouchStart={onSeekStart}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
            transition: isSeeking ? "none" : undefined,
          }}
        />
        <div
          className={styles.progressThumb}
          style={{
            left: `${progress}%`,
            transition: isSeeking ? "none" : undefined,
          }}
        />
      </div>
    </div>
  );
};

const ExpandedControlsDrawer: React.FC<ExpandedControlsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  currentTrack,
  prevTrack,
  nextTrack,
  playing,
  onPlayPause,
  onSeek,
  onNextTrack,
  onPrevTrack,
  tracks,
  onTrackSelect,
  playlistIsPlaying,
}) => {
  const duration = usePlayerStore(state => state.duration)
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false)
  const [isLyricsDrawerOpen, setIsLyricsDrawerOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isChangingTrack, setIsChangingTrack] = useState(false)
  const dragConstraintsRef = useRef(null)

  const [activeTrackId, setActiveTrackId] = useState(currentTrack.id)

  // For track change animation without swipe
  const [prevTrackId, setPrevTrackId] = useState<number | null>(null)

  useEffect(() => {
    if (prevTrackId && prevTrackId !== currentTrack.id) {
      // Determine direction based on track index in playlist
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
      const prevIndex = tracks.findIndex((track) => track.id === prevTrackId)

      if (currentIndex > prevIndex) {
        setSwipeDirection("left")
      } else {
        setSwipeDirection("right")
      }

      // Reset after animation
      setTimeout(() => {
        setSwipeDirection(null)
      }, 500)
    }
    setPrevTrackId(currentTrack.id)
  }, [currentTrack.id, tracks, prevTrackId])

  // Motion values for the drag animation
  const x = useMotionValue(0)
  const coverOpacity = useTransform(x, [-200, 0, 200], [0.3, 1, 0.3])
  const coverScale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])
  const prevCoverOpacity = useTransform(x, [-100, 0, 200], [0, 0.7, 1])
  const nextCoverOpacity = useTransform(x, [-200, 0, 100], [1, 0.7, 0])
  const prevCoverX = useTransform(x, [-100, 0, 200], [-350, -250, 0])
  const nextCoverX = useTransform(x, [-200, 0, 100], [0, 250, 350])

  const prevCoverScale = useTransform(x, [-100, 0, 200], [0.8, 1, 1.1])
  const nextCoverScale = useTransform(x, [-200, 0, 100], [1.1, 1, 0.8])

  const [isSeeking, setIsSeeking] = useState(false)
  const [seekValue, setSeekValue] = useState(0)

  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleSeekMove(e)
    window.addEventListener("mousemove", handleSeekMove as EventListener)
    window.addEventListener("mouseup", handleSeekEnd as EventListener)
    window.addEventListener("touchmove", handleSeekMove as EventListener)
    window.addEventListener("touchend", handleSeekEnd as EventListener)
  }

  const handleSeekMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    let clientX: number | undefined
    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else if ("clientX" in e) {
      clientX = e.clientX
    }
    const progressBar = document.getElementById("player-progress-bar")
    if (!progressBar || typeof clientX !== "number") return
    const rect = progressBar.getBoundingClientRect()
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
    const progressBar = document.getElementById("player-progress-bar")
    let finalSeek = seekValue
    if (progressBar && typeof clientX === "number") {
      const rect = progressBar.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      finalSeek = (x / rect.width) * duration
    }
    window.removeEventListener("mousemove", handleSeekMove as EventListener)
    window.removeEventListener("mouseup", handleSeekEnd as EventListener)
    window.removeEventListener("touchmove", handleSeekMove as EventListener)
    window.removeEventListener("touchend", handleSeekEnd as EventListener)
    onSeek(finalSeek)
  }

  const toggleQueueDrawer = () => {
    setIsQueueDrawerOpen(!isQueueDrawerOpen)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100 // Minimum distance to trigger track change

    if (info.offset.x > threshold) {
      setIsChangingTrack(true)
      animate(x, 300, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          onPrevTrack()
          setActiveTrackId(tracks[tracks.findIndex(t => t.id === currentTrack.id) - 1]?.id ?? currentTrack.id)
          x.set(0)
          setIsChangingTrack(false)
          animate(prevCoverScale, 1, { duration: 0.2 })
          animate(nextCoverScale, 1, { duration: 0.2 })
        },
      })
    } else if (info.offset.x < -threshold) {
      setIsChangingTrack(true)
      animate(x, -300, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          onNextTrack()
          x.set(0)
          setIsChangingTrack(false)
          animate(prevCoverScale, 1, { duration: 0.2 })
          animate(nextCoverScale, 1, { duration: 0.2 })
        },
      })
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 500,
        damping: 50,
        onComplete: () => {
          animate(prevCoverScale, 1, { duration: 0.2 })
          animate(nextCoverScale, 1, { duration: 0.2 })
        },
      })
    }

    setIsDragging(false)
  }

  return (
    <>
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground={false} modal={true}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className={`${styles.drawerContent} ${isDrawerOpen ? styles.open : styles.closed} ${styles.mobileDrawer}`}
            ref={dragConstraintsRef}
          >
            <Drawer.Close asChild>
              <motion.button
                initial={{ scale: 0, translateX: "-50%" }}
                animate={{ scale: 1, translateX: "-50%" }}
                whileHover={{ scale: 1.1, translateX: "-50%" }}
                whileTap={{ scale: 0.9, translateX: "-50%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={styles.DrawerCloseButton}>
                <ChevronDown size={16} strokeWidth={3} />

              </motion.button>
            </Drawer.Close>
            <div className={styles.dialogHeader}>
              <div className={styles.coverCarouselContainer} ref={dragConstraintsRef}>
                {/* Previous track */}
                {prevTrack && (
                  <motion.div
                    className={styles.adjacentCoverPreview}
                    style={{
                      x: prevCoverX,
                      opacity: prevCoverOpacity,
                      scale: prevCoverScale,
                      zIndex: -1,
                    }}
                  >
                    <Image
                      src={prevTrack.cover || "/placeholder.svg"}
                      alt={prevTrack.title}
                      width={120}
                      height={120}
                      className={styles.dialogCover}
                    />
                  </motion.div>
                )}

                {/* Current track */}
                <motion.div
                  drag="x"
                  dragConstraints={dragConstraintsRef}
                  dragElastic={0.2}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  style={{
                    x,
                    opacity: coverOpacity,
                    scale: coverScale,
                    zIndex: 2,
                    position: "relative",
                  }}
                  className={cn(
                    styles.dialogCoverWrapper,
                    currentTrack.id === activeTrackId && styles.activeCover // добавьте этот класс
                  )}
                >
                  <Image
                    src={currentTrack.cover || "/placeholder.svg"}
                    alt={currentTrack.title}
                    width={200}
                    height={200}
                    className={styles.dialogCover}
                  />
                </motion.div>

                {/* Next track */}
                {nextTrack && (
                  <motion.div
                    className={styles.adjacentCoverPreview}
                    style={{
                      x: nextCoverX,
                      opacity: nextCoverOpacity,
                      scale: nextCoverScale,
                      zIndex: -1,
                    }}
                  >
                    <Image
                      src={nextTrack.cover || "/placeholder.svg"}
                      alt={nextTrack.title}
                      width={120}
                      height={120}
                      className={styles.dialogCover}
                    />
                  </motion.div>
                )}
              </div>

              <div className={styles.mobilePlayerInfo}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id}
                    className={styles.trackInfo}
                    initial={{
                      y: swipeDirection ? 20 : 0,
                      opacity: swipeDirection ? 0 : 1,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      y: swipeDirection ? -20 : 0,
                      opacity: 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
                  >
                    <div className={cn(styles.trackTitle, styles.trackText)}>
                      <span>{currentTrack.title}</span>
                      <div className={styles.marquee} aria-hidden="true">
                        <div className={styles.marquee__inner}>
                          <span>{currentTrack.title}</span>
                          <span>{currentTrack.title}</span>
                          <span>{currentTrack.title}</span>
                          <span>{currentTrack.title}</span>
                        </div>
                      </div>
                    </div>
                    <div className={cn(styles.trackArtist, styles.trackText)}>
                      <span>{currentTrack.artist}</span>
                      <div className={styles.marquee} aria-hidden="true">
                        <div className={styles.marquee__inner}>
                          <span>{currentTrack.artist}</span>
                          <span>{currentTrack.artist}</span>
                          <span>{currentTrack.artist}</span>
                          <span>{currentTrack.artist}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Button className={styles.otherBtn} view="ghost" onClick={() => setIsLyricsDrawerOpen(true)}>
                <MoreIcon />
              </Button>
            </div>
            <div className={styles.mobileProgressBlock}>
              <ProgressBar isSeeking={isSeeking} seekValue={seekValue} onSeekStart={handleSeekStart} />
              <CurrentTime isSeeking={isSeeking} seekValue={seekValue} />
              <DurationTime />
            </div>
            <div className={styles.mobilePlayerControls}>
              <Button view="ghost" onClick={() => setIsLyricsDrawerOpen(true)} className={styles.lyrics_button}>
                <span className="material-symbols-outlined">
                  <LyricsIcon />
                </span>
              </Button>
              <button onClick={onPrevTrack} className={styles.prev_button}>
                <span className="material-symbols-outlined">
                  <PrevIcon />
                </span>
              </button>
              <button
                onClick={onPlayPause}
                className={cn(styles.play_button, {
                  [styles.pauseIcon]: playing == true,
                  [styles.playIcon]: playing == false,
                })}
              >
                <span className="material-symbols-outlined">{/* playing ? <PauseIcon/> : <PlayIcon/> */}</span>
              </button>
              <button onClick={onNextTrack} className={styles.next_button}>
                <span className="material-symbols-outlined">
                  <NextIcon />
                </span>
              </button>
              <Button view="ghost" onClick={toggleQueueDrawer} className={styles.queue_button}>
                <QueueIcon />
              </Button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <QueueDrawer
        isDrawerOpen={isQueueDrawerOpen}
        setIsDrawerOpen={setIsQueueDrawerOpen}
        tracks={tracks}
        currentTrack={currentTrack}
        onTrackSelect={onTrackSelect}
        playlist={playlistIsPlaying}
      />
      <LyricsDrawer
        isDrawerOpen={isLyricsDrawerOpen}
        setIsDrawerOpen={setIsLyricsDrawerOpen}
        currentTrack={currentTrack}
        togglePlay={onPlayPause}
        isPlaying={playing}
      />
    </>
  )
}

export default ExpandedControlsDrawer
