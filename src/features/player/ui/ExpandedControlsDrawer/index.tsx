/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import styles from "./ExpandedControlsDrawer.module.css"
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
import { motion, type PanInfo, AnimatePresence } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import { LikeButton } from '@/components/LikeButton/LikeButton';
import { ExpandedControlsDrawerProps } from "./ExpandedControlsDrawer.props"
import { PlaybackButtons } from "../PlaybackButtons/PlaybackButtons"
import { MobileReactiveBackground } from "@/features/audio-reactive-visualizer"
import { TextMorph } from "torph/react"

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
        <NumberFlow prefix=":" trend={1} value={Math.floor(seconds % 60)} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} transformTiming={{ duration: 370 }} />
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
        <NumberFlow prefix=":" trend={1} value={Math.floor(seconds % 60)} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} transformTiming={{ duration: 370 }} />
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
    <div className={styles.playerProgress} id="player-progress-bar" onMouseDown={onSeekStart} onTouchStart={onSeekStart} style={{ cursor: "pointer" }}>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%`, transition: isSeeking ? "none" : undefined }} />
        <div className={styles.progressThumb} style={{ left: `${progress}%`, transition: isSeeking ? "none" : undefined }} />
      </div>
    </div>
  );
};

const GAP = 20

// ─── Cover Carousel ──────────────────────────────────────────
// Uses a simple CSS transform approach: 3 covers in a row,
// we translate the whole strip. Drag moves the strip.
// On release past threshold, we CSS-transition to snap,
// then swap data and reset.
function useCoverCarousel({
  currentTrack, prevTrack, nextTrack, onNextTrack, onPrevTrack,
}: {
  currentTrack: any;
  prevTrack: any;
  nextTrack: any;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)
  const directionLockedRef = useRef<'horizontal' | 'vertical' | null>(null)
  const pointerIdRef = useRef<number | null>(null)

  // Measure container on mount and resize
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.target.getBoundingClientRect().width)
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Get one slide width
  const getSlideWidth = () => containerWidth || containerRef.current?.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 300)

  // Compute strip translateX: center on middle (current) slide
  // We need to move exactly (slideWidth + GAP) to centered on next/prev
  const baseOffset = prevTrack ? -(getSlideWidth() + GAP) : 0

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransitioning) return
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    pointerIdRef.current = e.pointerId
    directionLockedRef.current = null
    isDraggingRef.current = false
    // DON'T capture pointer yet — wait for direction detection
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current

    // Direction detection: first 10px of movement
    if (!directionLockedRef.current) {
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      if (absDx < 10 && absDy < 10) return // Not enough movement yet

      if (absDx > absDy) {
        // Horizontal — capture pointer and start drag
        directionLockedRef.current = 'horizontal'
        isDraggingRef.current = true
        try {
          ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
        } catch { }
      } else {
        // Vertical — let drawer handle it, abort
        directionLockedRef.current = 'vertical'
        pointerIdRef.current = null
        return
      }
    }

    if (directionLockedRef.current !== 'horizontal') return
    setDragOffset(dx)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return
    pointerIdRef.current = null

    if (!isDraggingRef.current) {
      // No drag happened — reset
      directionLockedRef.current = null
      return
    }

    isDraggingRef.current = false
    directionLockedRef.current = null
    const dx = e.clientX - startXRef.current
    const slideWithGap = getSlideWidth() + GAP
    const threshold = slideWithGap * 0.2

    if (dx < -threshold && nextTrack) {
      snapTo(-slideWithGap, () => { onNextTrack() })
    } else if (dx > threshold && prevTrack) {
      snapTo(slideWithGap, () => { onPrevTrack() })
    } else {
      snapTo(0, () => { })
    }
  }

  const snapTo = (targetOffset: number, onDone: () => void) => {
    setIsTransitioning(true)
    setDragOffset(targetOffset)
    // Wait for CSS transition to finish, then swap data and reset
    setTimeout(() => {
      // 1. Swap track data first
      onDone()
      // 2. Then reset visual state (React batches these)
      setDragOffset(0)
      setIsTransitioning(false)
    }, 350)
  }

  // Button handlers
  const goNext = () => {
    if (isTransitioning || !nextTrack) return
    snapTo(-(getSlideWidth() + GAP), onNextTrack)
  }
  const goPrev = () => {
    if (isTransitioning || !prevTrack) return
    snapTo(getSlideWidth() + GAP, onPrevTrack)
  }

  const translateX = baseOffset + dragOffset

  return {
    element: (
      <div className={styles.coverCarouselContainer} ref={containerRef}>
        <div
          ref={stripRef}
          className={styles.coverStrip}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)' : 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {prevTrack && (
            <div className={styles.coverSlide}>
              <Image src={prevTrack.cover || "/placeholder.png"} alt="Previous" width={400} height={400} className={styles.dialogCover} draggable={false} priority />
            </div>
          )}
          <div className={styles.coverSlide}>
            <Image src={currentTrack.cover || "/placeholder.png"} alt={currentTrack.title || "Cover"} width={400} height={400} className={styles.dialogCover} draggable={false} priority />
          </div>
          {nextTrack && (
            <div className={styles.coverSlide}>
              <Image src={nextTrack.cover || "/placeholder.png"} alt="Next" width={400} height={400} className={styles.dialogCover} draggable={false} priority />
            </div>
          )}
        </div>
      </div>
    ),
    goNext,
    goPrev,
  }
}

// ─── Main Component ──────────────────────────────────────────
const ExpandedControlsDrawer: React.FC<ExpandedControlsDrawerProps> = ({
  isDrawerOpen, setIsDrawerOpen, currentTrack, prevTrack, nextTrack,
  playing, onPlayPause, onSeek, onNextTrack, onPrevTrack,
  tracks, onTrackSelect, playlistIsPlaying,
}) => {
  const duration = usePlayerStore(state => state.duration)
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false)
  const [isLyricsDrawerOpen, setIsLyricsDrawerOpen] = useState(false)

  const carousel = useCoverCarousel({ currentTrack, prevTrack, nextTrack, onNextTrack, onPrevTrack })

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
    if ("touches" in e) clientX = e.touches[0].clientX
    else if ("clientX" in e) clientX = e.clientX
    const progressBar = document.getElementById("player-progress-bar")
    if (!progressBar || typeof clientX !== "number") return
    const rect = progressBar.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSeekValue((x / rect.width) * duration)
  }

  const handleSeekEnd = (e: MouseEvent | TouchEvent) => {
    setIsSeeking(false)
    let clientX: number | undefined
    if ("changedTouches" in e) clientX = e.changedTouches[0].clientX
    else if ("clientX" in e) clientX = e.clientX
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

  return (
    <>
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground={false} modal={true}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className={`${styles.drawerContent} ${isDrawerOpen ? styles.open : styles.closed} ${styles.mobileDrawer}`}>
            <MobileReactiveBackground
              coverUrl={currentTrack?.cover}
              dominantColor={(currentTrack?.colors as any)?.dominant}
            />
            <Drawer.Title className="sr-only">Player Controls</Drawer.Title>
            <Drawer.Close asChild>
              <motion.button
                initial={{ scale: 0, translateX: "-50%" }} animate={{ scale: 1, translateX: "-50%" }}
                whileHover={{ scale: 1.1, translateX: "-50%" }} whileTap={{ scale: 0.9, translateX: "-50%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={styles.DrawerCloseButton}>
                <ChevronDown size={16} strokeWidth={4} />
              </motion.button>
            </Drawer.Close>
            <div className={styles.dialogCoverContainer}>
              {carousel.element}
            </div>
            <div className={styles.trackInfoContainer}>
              <div className={styles.mobilePlayerInfo}>
                <div className={styles.trackInfo}>
                  <div className={styles.trackTitleContainer}>
                    <div className={cn(styles.trackTitle, styles.trackText)}>
                      <TextMorph>{currentTrack.title}</TextMorph>
                      <div className={styles.marquee} aria-hidden="true">
                        <div className={styles.marquee__inner}>
                          <span>{currentTrack.title}</span><span>{currentTrack.title}</span>
                          <span>{currentTrack.title}</span><span>{currentTrack.title}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">

                    </div>
                  </div>
                  <div className={cn(styles.trackArtist, styles.trackText)}>
                    <TextMorph>{currentTrack.artist}</TextMorph>
                  </div>
                </div>
              </div>
              <div className={styles.otherBtn}>
                <LikeButton trackId={currentTrack.id} size={24} />
                <Button view="ghost"><MoreIcon /></Button>
              </div>
            </div>

            <div className={styles.mobileProgressBlock}>
              <ProgressBar isSeeking={isSeeking} seekValue={seekValue} onSeekStart={handleSeekStart} />
              <CurrentTime isSeeking={isSeeking} seekValue={seekValue} />
              <DurationTime />
            </div>
            <div className={styles.mobilePlayerControls}>
              <button onClick={() => setIsLyricsDrawerOpen(true)} className={cn("material-symbols-outlined", styles.lyrics_button)}>
                <LyricsIcon />
              </button>
              <PlaybackButtons
                isPlaying={playing}
                onPlayPause={onPlayPause}
                onPrev={carousel.goPrev}
                onNext={carousel.goNext}
                className={styles.playback_container}
              />
              <button onClick={() => setIsQueueDrawerOpen(!isQueueDrawerOpen)} className={cn(styles.queue_button)}>
                <QueueIcon />
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <QueueDrawer isDrawerOpen={isQueueDrawerOpen} setIsDrawerOpen={setIsQueueDrawerOpen} tracks={tracks} currentTrack={currentTrack} onTrackSelect={onTrackSelect} playlist={playlistIsPlaying} />
      <LyricsDrawer isDrawerOpen={isLyricsDrawerOpen} setIsDrawerOpen={setIsLyricsDrawerOpen} currentTrack={currentTrack} togglePlay={onPlayPause} isPlaying={playing} />
    </>
  )
}

export default ExpandedControlsDrawer
