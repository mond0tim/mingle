"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Track } from "@/types"
import styles from "./MobilePlayer.module.css"
import ExpandedControlsDrawer from "../ExpandedControlsDrawer"
import Image from "next/image"
import { PlayButton } from "../PlaybackButtons/PlaybackButtons"
import { LikeButton } from "@/components/LikeButton/LikeButton"
import { usePlayerStore } from "../../store/playerStore"
import { MobilePlayerProps } from "./MobilePlayer.props"
import cn from "classnames"

/**
 * CAROUSEL MATHEMATICAL GUIDE 
 * ----------------------------
 * To adjust how much of the neighboring slides is visible ("peeking"):
 * 
 * 1. PEEK: The exact number of pixels visible from the previous/next slide.
 * 2. GAP: The space between slides.
 * 3. Slide Width (W): Must be (ContainerWidth - 2 * PEEK - 2 * GAP)? 
 *    Actually, we use calc(100% - X) in CSS.
 * 
 * Formuła for centering the active slide (Index 1):
 * baseOffset = PEEK - (SlideWidth + GAP)
 */
const GAP = 0 // Space between slides
const PEEK = 20 // Pixels visible from adjacent slides

interface MiniPlayerSlideProps {
  track: Track | null
  isPlaying: boolean
  onPlayPause: (e: React.MouseEvent) => void
  isCurrent: boolean
  seek: number
  duration: number
  onToggleDrawer: () => void
  style?: React.CSSProperties
}

const MiniPlayerSlide: React.FC<MiniPlayerSlideProps> = ({
  track,
  isPlaying,
  onPlayPause,
  isCurrent,
  seek,
  duration,
  onToggleDrawer,
  style,
}) => {
  if (!track) return <div className={cn(styles.playerSlide, styles.emptySlide)} />

  const progress = duration > 0 ? (seek / duration) * 100 : 0
  const dominantColor = track.color || (track.colors as any)?.dominant || "#0f0f23"

  return (
    <div
      className={cn(styles.playerSlide, { [styles.activeSlide]: isCurrent })}
      style={{
        "--dominant-color": dominantColor,
        ...style,
      } as React.CSSProperties}
    >
      <div className={styles.slideContent} onClick={onToggleDrawer}>
        <Image
          src={track.cover || "/no-cover.jpg"}
          alt={track.title}
          width={50}
          height={50}
          className={styles.mobilePlayerCover}
        />
        <div className={styles.mobilePlayerInfoMini}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>{track.artist}</div>
        </div>
      </div>

      <div className={styles.likeWrapper}>
        <LikeButton trackId={track.id} size={24} className="" />
      </div>

      <PlayButton
        isPlaying={isPlaying}
        onClick={onPlayPause}
        variant="solo-mini"
        className={styles.play_button}
        style={{
          "--play-button-background": "lch(from var(--dominant-color, #0f0f23) calc((49.44 - l) * infinity) 0 0)",
          "--play-button-color": "var(--dominant-color, #0f0f23)",
          justifySelf: "right",
        } as React.CSSProperties}
      />

      <div className={styles.mobileProgressBarContainer}>
        <div
          className={styles.mobileProgressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

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
  const seek = usePlayerStore((state) => state.seek)
  const duration = usePlayerStore((state) => state.duration)
  const [isExpandedDrawerOpen, setIsExpandedDrawerOpen] = useState(false)

  const [containerWidth, setContainerWidth] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastWidthRef = useRef(0)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)
  const directionLockedRef = useRef<"horizontal" | "vertical" | null>(null)
  const pointerIdRef = useRef<number | null>(null)

  useEffect(() => {
    // ResizeObserver on mobile is too sensitive and causes feedback loops during transforms.
    // window resize is more stable for carousel initialization.
    const updateWidth = () => {
      if (!containerRef.current) return
      const newWidth = Math.round(containerRef.current.getBoundingClientRect().width)

      // Significant change threshold (10px) to prevent sub-pixel jitter loops during drags
      if (Math.abs(lastWidthRef.current - newWidth) > 10 || lastWidthRef.current === 0) {
        lastWidthRef.current = newWidth
        setContainerWidth(newWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    // We keep a one-time measurement on mount and only rely on resize for stability.
    return () => window.removeEventListener("resize", updateWidth)
  }, []) // Fix: Empty dependency array prevents re-attachment loop

  /**
   * CAROUSEL MATHEMATICAL GUIDE
   * ---------------------------
   * 1. SlideWidth (W): containerWidth - 40 (Must match calc(100% - 40px) in CSS)
   * 2. Gap (G): Fixed pixel gap (GAP constant)
   * 
   * Current slide (index 1) position in the strip: W + G
   * Target position (centered): (ContainerWidth - W) / 2
   * 
   * Because SlideWidth = ContainerWidth - 40, 
   * Target position = (ContainerWidth - (ContainerWidth - 40)) / 2 = 20px
   * 
   * baseOffset: The value for 'transform: translateX()' to reach target.
   * translateX + (W + G) = TargetPosition (20px)
   * translateX = 20 - (W + G)
   */
  const getSlideWidth = () => containerWidth > 0 ? containerWidth - 40 : 0
  const slideWithGap = getSlideWidth() + GAP
  const baseOffset = 20 - slideWithGap

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransitioning) return
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    pointerIdRef.current = e.pointerId
    directionLockedRef.current = null
    isDraggingRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current

    if (!directionLockedRef.current) {
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      if (absDx < 5 && absDy < 5) return

      if (absDx > absDy) {
        directionLockedRef.current = "horizontal"
        isDraggingRef.current = true
        try {
          ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
        } catch { }
      } else {
        directionLockedRef.current = "vertical"
        pointerIdRef.current = null
        return
      }
    }

    if (directionLockedRef.current === "horizontal") {
      setDragOffset(dx)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return
    pointerIdRef.current = null

    if (!isDraggingRef.current) {
      directionLockedRef.current = null
      return
    }

    isDraggingRef.current = false
    directionLockedRef.current = null
    const dx = e.clientX - startXRef.current
    const threshold = slideWithGap * 0.2

    if (dx < -threshold && nextTrack) {
      snapTo(-slideWithGap, onNextTrack)
    } else if (dx > threshold && prevTrack) {
      snapTo(slideWithGap, onPrevTrack)
    } else {
      snapTo(0, () => { })
    }
  }

  const snapTo = (targetOffset: number, onDone: () => void) => {
    setIsTransitioning(true)
    setDragOffset(targetOffset)
    setTimeout(() => {
      onDone()
      setDragOffset(0)
      setIsTransitioning(false)
    }, 400)
  }

  const translateX = baseOffset + dragOffset

  // Calculate interpolation
  const dragProgress = slideWithGap > 0 ? dragOffset / slideWithGap : 0
  const absProgress = Math.abs(dragProgress)

  const activeStyle: React.CSSProperties = {
    opacity: 1 - absProgress * 0.6,
    transform: `scale(${1 - absProgress * 0.05})`,
    transition: isTransitioning ? "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
  }

  const inactiveStylePrev: React.CSSProperties = {
    opacity: 0.8 + (dragProgress > 0 ? absProgress * 0.8 : 0),
    transform: `scale(${0.95 + (dragProgress > 0 ? absProgress * 0.05 : 0)})`,
    transition: isTransitioning ? "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
  }

  const inactiveStyleNext: React.CSSProperties = {
    opacity: 0.8 + (dragProgress < 0 ? absProgress * 0.8 : 0),
    transform: `scale(${0.95 + (dragProgress < 0 ? absProgress * 0.05 : 0)})`,
    transition: isTransitioning ? "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
  }

  if (!currentTrack) return null

  return (
    <div className={styles.mobilePlayer}>
      <div className={styles.mobilePlayerContainer} ref={containerRef}>
        <div
          className={styles.carouselStrip}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
            gap: `${GAP}px`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <MiniPlayerSlide
            track={prevTrack}
            isPlaying={false}
            onPlayPause={(e) => {
              e.stopPropagation()
              onPrevTrack()
              onPlayPause()
            }}
            isCurrent={false}
            seek={0}
            duration={0}
            onToggleDrawer={() => setIsExpandedDrawerOpen(true)}
            style={inactiveStylePrev}
          />
          <MiniPlayerSlide
            track={currentTrack}
            isPlaying={playing}
            onPlayPause={(e) => {
              e.stopPropagation()
              onPlayPause()
            }}
            isCurrent={true}
            seek={seek}
            duration={duration}
            onToggleDrawer={() => setIsExpandedDrawerOpen(true)}
            style={activeStyle}
          />
          <MiniPlayerSlide
            track={nextTrack}
            isPlaying={false}
            onPlayPause={(e) => {
              e.stopPropagation()
              onNextTrack()
              onPlayPause()
            }}
            isCurrent={false}
            seek={0}
            duration={0}
            onToggleDrawer={() => setIsExpandedDrawerOpen(true)}
            style={inactiveStyleNext}
          />
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
    </div>
  )
}

export default MobilePlayer
