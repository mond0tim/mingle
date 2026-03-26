"use client"

import React, { useEffect, useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Track, LyricsApiResponse } from "@/types"
import { AudioWaveform } from "lucide-react"
import styles from "./LyricsContent.module.css"
import cn from "classnames"
import { Skeleton } from '../ui/skeleton'

interface LyricsContentProps {
  currentTrack: Track | null
  duration: number
  seek: number
  onSeek: (seek: number) => void
  isDrawerOpen?: boolean
}

interface SyncedLine {
  time: number | null
  text: string
}

function parseSyncedLyrics(syncedLyrics: string): SyncedLine[] {
  const lines = syncedLyrics.split("\n")
  return lines.map((line) => {
    if (line.trim() === "") return { time: null, text: "" }
    const match = line.match(/^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]\s*(.*)$/)
    if (!match) return { time: null, text: line }
    const [, min, sec, ms, text] = match
    const time =
      Number.parseInt(min) * 60 + Number.parseInt(sec) + (ms ? Number.parseInt(ms) / (ms.length === 3 ? 1000 : 100) : 0)
    return { time, text }
  })
}

// Вынесите lyricsCache за пределы компонента, чтобы он был общим для всех экземпляров
const lyricsCache = new Map<string, LyricsApiResponse>()

const LyricsContent: React.FC<LyricsContentProps> = ({
  currentTrack,
  duration,
  seek,
  onSeek,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const fullscreenContainerRef = useRef<HTMLDivElement>(null)
  const [userScrolling, setUserScrolling] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const activeLineRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoScrollingRef = useRef(false)
  const autoScrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const lastScrollTopRef = useRef<number>(0)

  // New states for fullscreen and text size
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Add these states and refs for lyrics loading
  const [notFound, setNotFound] = useState(false)
  const retryTimeout = useRef<NodeJS.Timeout | null>(null)
  const notFoundTimeout = useRef<NodeJS.Timeout | null>(null)

  // Helper functions for API
  const getArtistForApi = (artist: string) => artist.split(",")[0].trim()
  const getCacheKey = (track: Track, duration: number) => `${track.id}_${Math.round(duration)}`

  // Lyrics loading state
  const [lyricsData, setLyricsData] = useState<LyricsApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch lyrics logic
  useEffect(() => {
    if (!currentTrack || !currentTrack.title || !currentTrack.artist || !duration) {
      setLyricsData(null)
      setError(null)
      setNotFound(false)
      setLoading(false)
      return
    }

    const cacheKey = getCacheKey(currentTrack, duration)
    if (lyricsCache.has(cacheKey)) {
      setLyricsData(lyricsCache.get(cacheKey)!)
      setLoading(false)
      setError(null)
      setNotFound(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setLyricsData(null)
    setNotFound(false)

    const fetchLyrics = () => {
      const params = new URLSearchParams({
        track_name: currentTrack.title,
        artist_name: getArtistForApi(currentTrack.artist),
        duration: Math.round(duration).toString(),
      })

      fetch(`https://lrclib.net/api/get?${params.toString()}`)
        .then(async (res) => {
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("Текст не найден для этого трека")
            }
            const data = await res.json()
            throw new Error(data.message || data.error || "Ошибка загрузки текста")
          }
          return res.json()
        })
        .then((data) => {
          if (cancelled) return
          lyricsCache.set(cacheKey, data)
          setLyricsData(data)
          setError(null)
          setLoading(false)
          setNotFound(false)
        })
        .catch((e) => {
          if (cancelled) return
          setError(e.message)
          setLoading(false)
          if (e.message && e.message.includes("Текст не найден для этого трека")) {
            setNotFound(true)
            notFoundTimeout.current = setTimeout(() => setNotFound(false), 3000)
          }
          if (e.message && e.message.includes("Failed to find specified track")) {
            retryTimeout.current = setTimeout(fetchLyrics, 5000)
          }
        })
    }

    fetchLyrics()

    return () => {
      cancelled = true
      if (retryTimeout.current) clearTimeout(retryTimeout.current)
      if (notFoundTimeout.current) clearTimeout(notFoundTimeout.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, currentTrack?.id, currentTrack?.title, currentTrack?.artist, duration])

  // Parse synced lyrics
  const syncedLines = useMemo(() => {
    if (lyricsData?.syncedLyrics) return parseSyncedLyrics(lyricsData.syncedLyrics)
    return null
  }, [lyricsData?.syncedLyrics])

  // Find current line index
  const currentLineIdx = useMemo(() => {
    if (!syncedLines) return -1
    for (let i = syncedLines.length - 1; i >= 0; i--) {
      const line = syncedLines[i]
      if (line && line.time !== null && seek >= line.time) return i
    }
    return -1
  }, [syncedLines, seek])

  // Helper function to get active container
  const getActiveContainer = React.useCallback(() => {
    return isFullscreen ? fullscreenContainerRef.current : containerRef.current
  }, [isFullscreen])

  // Set up resize observer to track container height
  useEffect(() => {
    const container = getActiveContainer()
    if (!container) return

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height)
      }
    })

    resizeObserverRef.current.observe(container)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [isFullscreen, getActiveContainer])

  // Handle user scrolling with improved detection
  useEffect(() => {
    const setupScrollListeners = () => {
      const container = getActiveContainer()
      if (!container) return false

      // Initialize last scroll position
      lastScrollTopRef.current = container.scrollTop

      // Function to detect manual scrolling
      const detectManualScroll = () => {
        // If this scroll event is from auto-scrolling, ignore it
        if (isAutoScrollingRef.current) {
          return
        }

        // Check if scroll position actually changed
        const currentScrollTop = container.scrollTop
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTopRef.current)

        // Only consider it manual scrolling if there was a significant change
        if (scrollDifference > 2) {
          setUserScrolling(true)
          setAutoScrollEnabled(false)
          setLastScrollTime(Date.now())

          // Clear any existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
        }

        // Update last scroll position
        lastScrollTopRef.current = currentScrollTop
      }

      // Handle wheel events (definitely user-initiated)
      const handleWheel = (e: WheelEvent) => {
        // Immediately mark as user scrolling on wheel event
        if (Math.abs(e.deltaY) > 0) {
          setUserScrolling(true)
          setAutoScrollEnabled(false)
          setLastScrollTime(Date.now())

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
        }
      }

      // Handle touch events
      let touchStartY = 0

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY
        const touchDiff = Math.abs(touchY - touchStartY)

        // If significant vertical movement detected
        if (touchDiff > 10) {
          setUserScrolling(true)
          setAutoScrollEnabled(false)
          setLastScrollTime(Date.now())

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
        }
      }

      // Add all event listeners
      container.addEventListener("scroll", detectManualScroll, { passive: true })
      container.addEventListener("wheel", handleWheel, { passive: true })
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: true })

      // Create a MutationObserver to detect changes in the DOM that might affect scrolling
      const observer = new MutationObserver(() => {
        // Reset last scroll position when DOM changes
        lastScrollTopRef.current = container.scrollTop
      })

      // Observe changes to the container
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      // Store cleanup function
      const cleanup = () => {
        container.removeEventListener("scroll", detectManualScroll)
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        observer.disconnect()
      }

      // Store cleanup function in component instance
      return cleanup
    }

    // Setup initial listeners
    let cleanup = setupScrollListeners()

    // Set up an interval to check if container is now available
    const interval = setInterval(() => {
      if (!cleanup && getActiveContainer()) {
        cleanup = setupScrollListeners()
        if (cleanup) {
          clearInterval(interval)
        }
      }
    }, 100)

    // Cleanup function
    return () => {
      clearInterval(interval)
      if (cleanup) {
        if (typeof cleanup === "function") {
          cleanup()
        }
      }
    }
  }, [isFullscreen, getActiveContainer])

  // Re-setup listeners when isFullscreen changes
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timeout = setTimeout(() => {
      const container = getActiveContainer()
      if (container) {
        // Reset scroll position tracking
        lastScrollTopRef.current = container.scrollTop
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [isFullscreen, getActiveContainer])

  // Re-enable auto-scroll after user stops scrolling
  useEffect(() => {
    if (!userScrolling) return

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set a new timeout to check if scrolling has stopped
    scrollTimeoutRef.current = setTimeout(() => {
      const now = Date.now()
      if (now - lastScrollTime > 5000) {
        setUserScrolling(false)
        setAutoScrollEnabled(true)
      }
    }, 5000)

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [userScrolling, lastScrollTime])

  // Auto-scroll to active line
  useEffect(() => {
    if (!autoScrollEnabled || currentLineIdx === -1 || userScrolling) return

    requestAnimationFrame(() => {
      const container = getActiveContainer()
      const activeElement = document.getElementById(`line-${currentLineIdx}`)

      if (!container || !activeElement) return

      // Получаем координаты активной строки относительно контейнера
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()
      const containerScrollTop = container.scrollTop

      // Центрируем строку относительно видимой части контейнера
      const offset = (activeRect.top + activeRect.bottom) / 2 - (containerRect.top + containerRect.bottom) / 2
      const scrollTo = containerScrollTop + offset

      isAutoScrollingRef.current = true

      if (autoScrollEndTimeoutRef.current) {
        clearTimeout(autoScrollEndTimeoutRef.current)
      }

      const beforeScrollTop = container.scrollTop

      container.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      })

      autoScrollEndTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false
        // Фоллбек если скролл не сработал
        if (Math.abs(container.scrollTop - beforeScrollTop) < 5 && Math.abs(container.scrollTop - scrollTo) > 10) {
          container.scrollTop = scrollTo
        }
      }, 600)
    })
  }, [currentLineIdx, autoScrollEnabled, userScrolling, containerHeight, getActiveContainer])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (autoScrollEndTimeoutRef.current) {
        clearTimeout(autoScrollEndTimeoutRef.current)
      }
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current)
      }
      if (notFoundTimeout.current) {
        clearTimeout(notFoundTimeout.current)
      }
    }
  }, [])

  // // Toggle auto-scroll
  // const handleToggleAutoScroll = () => {
  //   setAutoScrollEnabled(!autoScrollEnabled)
  //   setUserScrolling(!autoScrollEnabled)
  // }


  // Calculate opacity based on distance from current line
  const getOpacity = (index: number) => {
    if (userScrolling || !autoScrollEnabled) return 1

    const distance = Math.abs(index - currentLineIdx)
    // More dramatic opacity falloff
    return Math.max(0.2, 1 - distance * 0.2)
  }

 // Calculate blur based on distance from current line
 const getBlur = (index: number) => {
  if (userScrolling || !autoScrollEnabled) return 0
  const distance = Math.abs(index - currentLineIdx)
  // Блюр появляется только если строка дальше чем на 2 позиции от текущей
  if (distance <= 0) return 0
  // Чем дальше строка, тем больше блюр (максимум 6px)
  return Math.min((distance -  0.67) * 2, 6)
}

  // Render error message with animation
  const renderError = (message?: string, serverError?: string) => {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full text-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={cn("w-20 h-20 mb-6", styles.сolor)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type:"spring", stiffness: 300, damping: 15 }}
        >
<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 23.01 23.01">
        <motion.path
          d="M2,2,22,22"
          transform="translate(-0.49 -0.5)"
          className="stroke-current stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
        />
        
        <motion.path
          d="M8.35,2.69a10,10,0,0,1,13,13"
          transform="translate(-0.49 -0.5)" 
          className="stroke-current stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 0.2,
            pathLength: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.1 }
          }}
        />
        
        <motion.path
          d="M19.08,19.08A10,10,0,0,1,4.92,4.92"
          transform="translate(-0.49 -0.5)"
          className="stroke-current stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 1,
            pathLength: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.1 }
          }}
        />
      </svg>
        </motion.div>
        <motion.h3
          className="text-xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
           {message || "Не удалось загрузить текст"}
        </motion.h3>
        {serverError && (
          <motion.p
            className={cn("text-xs  mt-2 overflow-hidden", styles.сolor)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.8, height: "auto"}}
            transition={{ opacity: { duration: 0.5}, height: { type:"spring", stiffness: 300, damping: 15 }}}
          >
            {serverError}
          </motion.p>
        )}
        <motion.button
          className={cn("mt-6 px-4 py-2 rounded-full ", styles.invertBackgroundButton)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type:"spring", stiffness: 300, damping: 15 }}
          onClick={() => {
            // Повторить запрос к API
            setLoading(true)
            setError(null)
            setNotFound(false)
            setLyricsData(null)
            // Повторяем fetchLyrics
            const cacheKey = getCacheKey(currentTrack!, duration)
            const fetchLyrics = () => {
              const params = new URLSearchParams({
                track_name: currentTrack!.title,
                artist_name: getArtistForApi(currentTrack!.artist),
                duration: Math.round(duration).toString(),
              })
              fetch(`/api/lyrics?${params.toString()}`)
                .then(async (res) => {
                  if (!res.ok) {
                    if (res.status === 404) {
                      throw new Error("Текст не найден для этого трека")
                    }
                    const data = await res.json()
                    throw new Error(data.message || data.error || "Ошибка загрузки текста")
                  }
                  return res.json()
                })
                .then((data) => {
                  lyricsCache.set(cacheKey, data)
                  setLyricsData(data)
                  setError(null)
                  setLoading(false)
                  setNotFound(false)
                })
                .catch((e) => {
                  setError(e.message)
                  setLoading(false)
                  if (e.message && e.message.includes("Текст не найден для этого трека")) {
                    setNotFound(true)
                    notFoundTimeout.current = setTimeout(() => setNotFound(false), 3000)
                  }
                  if (e.message && e.message.includes("Failed to find specified track")) {
                    retryTimeout.current = setTimeout(fetchLyrics, 5000)
                  }
                })
            }
            fetchLyrics()
          }}
        >
          Попробовать снова
        </motion.button>
      </motion.div>
    )
  }

  // Render control buttons
  const renderControls = () => {
    return (
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-10">
        
        {/* Auto-scroll toggle button */}
        {/* <button
          onClick={handleToggleAutoScroll}
          className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
            autoScrollEnabled
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {autoScrollEnabled ? (
            <>
              <PauseCircle size={16} />
              <span>Disable Auto-scroll</span>
            </>
          ) : (
            <>
              <PlayCircle size={16} />
              <span>Enable Auto-scroll</span>
            </>
          )}
        </button> */}

      

        {/* Status indicators */}
        {/* {userScrolling && (
          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs mt-2">Manual scrolling</div>
        )}
        {isAutoScrollingRef.current && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs mt-2">Auto-scrolling</div>
        )} */}
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
    <AnimatePresence>
      <motion.div 
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ opacity: { duration: 0.5}}}
      className="flex flex-col gap-3 p-3 content-center items-center h-full">
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      <Skeleton className={cn('h-8 w-full', styles.skeleton)}/>
      </motion.div>
      </AnimatePresence>
    )
  }

  // Show not found state
  if (notFound) {
    return renderError("Текст не найден для этого трека")
  }

  // Show error state
  if (error) {
    // Если ошибка сервера, показываем её маленьким текстом ниже
    return renderError("Не удалось загрузить текст", error)
  }

  // Show no data state
  if (!lyricsData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className={styles.сolor}>Нет данных для отображения</p>
      </div>
    )
  }

  // Plain lyrics
  if (lyricsData.plainLyrics && !syncedLines) {
    const lines = lyricsData.plainLyrics.split("\n")
    const result: React.ReactNode[] = []
    let prevEmpty = false
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.trim() === "") {
        if (prevEmpty) {
          result.push(<div key={`space-${i}`} className="h-5" />)
        }
        prevEmpty = true
      } else {
        prevEmpty = false
        result.push(
          <div key={i} className={`py-2 ${styles.textColor}`} style={{ whiteSpace: "pre-line" }}>
            {line}
          </div>,
        )
      }
    }
    return (
      <div className={cn("overflow-y-auto h-full p-4 pb-32 pt-16 gap-6", styles.scrollContainer)} style={{ scrollBehavior: "smooth" }}>
        {result}
      </div>
    )
  }

  // Render normal mode with synced lyrics
  return (
    <div ref={containerRef} className={cn("overflow-y-auto h-full p-4 pb-32 pt-12 md:pt-16 ", styles.scrollContainer)} style={{ scrollBehavior: "smooth" }}>
      <div className="relative">
        <AnimatePresence>
          {syncedLines &&
            syncedLines.map((line, index) => {
              const isCurrent = index === currentLineIdx
              const isEmpty = line.text.trim() === ""

              return (
                <motion.div
                  id={`line-${index}`}
                  key={`line-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: getOpacity(index),
                    filter: `blur(${getBlur(index)}px)`,
                    scale: isCurrent ? 1.05 : 1,
                    borderRadius: isCurrent ? "13px" : "15px",
                    background: isCurrent ? "var(--dominant-color)" : "transparent",
                    
                  }}
                  transition={{ scale: {type: "spring", stiffness: 300, damping: 15}, borderRadius: {type: "spring", stiffness: 300, damping: 20}, opacity: { duration: 0.3 }, filter: { duration: 0.2 }, background: { duration: 0.2 } }}
                  className={`py-2 ${isEmpty ? "h-8" : ""} ${styles.textColor}`}
                  onClick={() => line.time !== null && onSeek(line.time)}
                  ref={isCurrent ? activeLineRef : null}
                  style={{
                    cursor: line.time !== null ? "pointer" : "default",
                    padding: "8px",
                    marginBottom: "4px",
                  }}
                >
                  
                  {isEmpty ? <AudioWaveform size={16} strokeWidth={3} /> : ""}
                  {line.text}
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>

      {renderControls()}
    </div>
  )
}

export default LyricsContent