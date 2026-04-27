'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '@/features/player/store/playerStore';
import styles from './HomeLyrics.module.css';
import { useLyrics } from '@/hooks/useLyrics';
import { TextMorph } from 'torph/react';
import { AboutIcon, BackIcon, LogoText, Music2Icon } from '@/shared/ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioReactiveStore } from '@/features/audio-reactive-visualizer';
import { useAnimationFrame } from 'framer-motion';
import Link from 'next/link';

/*
  3 фазы:
  1. idle   – нет трека → логотип по центру с shimmer
  2. track  – трек загружен, текст ещё не пришёл → лого влево, название по центру
  3. lyrics – текст получен → название вверх, строка по центру

  Позиционирование: CSS-переходы (transition).
  Появление/исчезновение: framer AnimatePresence.
  Размер текста: фиксированный font-size + transform: scale (не ломает TextMorph).
*/

type Phase = 'idle' | 'track' | 'lyrics';

/** Вычисляет масштаб для текста: длинные строки уменьшаются, а не меняют font-size */
function calcScale(text: string, isMobile: boolean): number {
  const len = text.length;

  if (isMobile) {
    // На мобилках мы разрешаем перенос строк (white-space: normal).
    if (len <= 25) return 1;
    if (len <= 45) return 0.85;
    if (len <= 65) return 0.75;
    return 0.65;
  }

  // Десктоп (nowrap)
  if (len <= 15) return 1;
  if (len <= 25) return 0.8;
  if (len <= 35) return 0.6;
  if (len <= 50) return 0.45;
  return 0.35;
}

const smooth = { type: 'spring' as const, stiffness: 170, damping: 26 };

const HomeLyrics = () => {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const { currentLine, lyricsActive } = useLyrics(currentTrack);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [activeScale, setActiveScale] = useState(1);
  const [trackScale, setTrackScale] = useState(1);

  const phase: Phase = useMemo(() => {
    if (!currentTrack) return 'idle';
    if (lyricsActive && !isMobile) return 'lyrics'; // На мобилках не показываем лирику
    return 'track';
  }, [currentTrack, lyricsActive, isMobile]);

  const [displayPhase, setDisplayPhase] = useState<Phase>(phase);
  const lastTrackId = useRef<string | number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useAnimationFrame(() => {
    if (trackRef.current && !isMobile) {
      const state = useAudioReactiveStore.getState();
      const weight = Math.floor(300 + state.bass * 800);
      trackRef.current.style.fontWeight = `${weight}`;
    }
  });

  useEffect(() => {
    if (phase === 'track' && displayPhase === 'lyrics') {
      const timer = setTimeout(() => {
        setDisplayPhase(phase);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setDisplayPhase(phase);
    }
  }, [phase]);

  const phaseToRender = displayPhase;
  const lineText = currentLine?.text || '';

  useEffect(() => {
    const targetLyricScale = lineText ? calcScale(lineText, isMobile) : 1;
    const combinedTrackInfo = `${currentTrack?.title ?? ''} ${currentTrack?.artist ?? ''}`;
    const targetTrackScale = calcScale(combinedTrackInfo, isMobile) * 1.1;

    if (currentTrack?.id !== lastTrackId.current) {
      lastTrackId.current = currentTrack?.id ?? null;
      const timer = setTimeout(() => {
        setActiveScale(targetLyricScale);
        setTrackScale(targetTrackScale);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setActiveScale(targetLyricScale);
      setTrackScale(targetTrackScale);
    }
  }, [lineText, currentTrack?.id, currentTrack?.title, currentTrack?.artist, isMobile]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>

          <Link href={'/about'} className="z-50 font-oddval rounded-full px-2 py-2 bg-white text-black absolute top-3 md:top-5 right-4 active:scale-90 transition-all duration-200 ease-out"><AboutIcon /> </Link>

          {/* ─── Логотип ─── */}
          <div
            className={`${styles.logo} ${phaseToRender === 'idle' ? styles.logoCentered : styles.logoCorner
              } ${phaseToRender !== 'idle' ? styles.mobileHidden : ''}`}
          >
            <div className={phaseToRender === 'idle' ? styles.shimmer : styles.shimmerFixed}>
              <LogoText className={styles.logoSvg} />
              {phaseToRender === 'idle' && <LogoText className={styles.shimmerHighlight} />}
            </div>
          </div>

          {/* ─── Название трека ─── */}
          <AnimatePresence>
            {phaseToRender !== 'idle' && (
              <motion.div
                key="track-title"
                ref={trackRef}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  top: phaseToRender === 'lyrics' ? 'var(--track-top, 1.25rem)' : '50%',
                  y: phaseToRender === 'lyrics' ? 0 : '-50%',
                  scale: phaseToRender === 'lyrics'
                    ? 'var(--track-scale, 0.65)'
                    : trackScale,
                }}
                exit={{ opacity: 0 }}
                transition={smooth}
                className={`${styles.trackInfo} transition-all duration-75 ease-out`}
                style={{
                  transformOrigin: 'top center',
                } as any}
              >
                <p className={styles.trackName}>
                  {isMobile ? (
                    currentTrack?.title ?? ''
                  ) : (
                    <TextMorph style={{ textAlign: 'center', display: 'block', width: '100%' }}>{currentTrack?.title ?? ''}</TextMorph>
                  )}
                </p>
                <p className={styles.trackArtist}>
                  {isMobile ? (
                    currentTrack?.artist ?? ''
                  ) : (
                    <TextMorph style={{ textAlign: 'center', display: 'block', width: '100%' }}>{currentTrack?.artist ?? ''}</TextMorph>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Текст песни (Только десктоп) ─── */}
          <AnimatePresence>
            {!isMobile && phaseToRender === 'lyrics' && (
              <motion.div
                key="lyrics-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.lyricsCenter}
                style={{
                  '--dominant-color': currentTrack?.colors?.accent || '#ffffffff',
                } as React.CSSProperties}
              >
                {lineText ? (
                  <motion.div
                    className={styles.lyricScaleWrap}
                    animate={{ scale: activeScale }}
                    transition={smooth}
                  >
                    <p className={styles.lyricLine}>
                      <TextMorph style={{ textAlign: 'center', display: 'block', width: '100%' }}>{lineText}</TextMorph>
                    </p>
                  </motion.div>
                ) : (
                  <div className={styles.lyricPause}>
                    <Music2Icon />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Индикатор скролла (Только мобилки + Трек играет) ─── */}
          {/* <AnimatePresence>
            {isMobile && currentTrack && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={styles.scrollIndicator}
              >
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className={styles.chevronWrap}
                >
                  <BackIcon />
                </motion.div>
              </motion.div>
            )} 
        </AnimatePresence>
*/}
        </div>
      </div>
    </section >
  );
};

export default HomeLyrics;
