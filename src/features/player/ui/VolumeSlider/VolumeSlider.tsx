'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import styles from './VolumeSlider.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const MUTE_BODY = "M52,9.64c4.83-5.19,13.2-14,20.22-7.14,4,3.87,3.23,17.63,3.24,23.25,0,25.14.13,50.29-.14,75.43,0,4-.64,7.4-4.25,9.66C60.53,118.43,40.66,92.53,31.25,85.5l-.83-.61c-5.83,0-21.14,1-24.81-3.27C-1.78,73-1.83,40.66,5.24,32c3.35-4.13,19.61-3.18,25.11-3.14C36.75,23,45.32,14.68,52,9.64Z";
const MUTE_X = "M95.5,29.34c6.1,1.45,15.18,12.15,19.93,17.13,5.37-6,14.24-17.9,23.54-15.26,6,8.31-8.17,19.77-13.68,25,7.46,8.5,21,14.25,12,25.94-9.43.4-15.72-9.17-22.15-15.69-5.51,5.9-15.09,17.85-24.22,14.75-5-8.35,8.8-19.79,14.16-24.94C97,47.76,81.11,39.4,95.5,29.34Z";

const VOLUME_BODY = "M64.61,0c3.81.82,10.07,2.62,10.45,7.54,1.73,22.86-.37,47.36.62,70.13C78.08,132.82,62.57,113.38,35,89,22.27,76.41-.3,97.46.18,66.13s-6-37.21,29.59-37C38.45,22.13,56.09,4.52,64.61,0Z";
const VOLUME_WAVE_INNER = "M92.38,25.58c25.42,1,28.53,44.93,6.28,62.34-18.76.43-1.21-20.44.23-30.05C101.25,41.83,82.59,39.24,92.35,25.58Z";
const VOLUME_WAVE_OUTER = "M114.38,4.7c18.71,0,28.57,34,29.14,49,.9,23.95-6.67,37.72-22.08,54.75-4.39,0-12.31-1.48-9.79-7.93,4.71-12,14.63-21.07,16.82-34.64,2.51-15.59-2.4-30.15-11.57-42.68-2.24-3.11-5.36-7.77-6.08-11.46C111.28,8,111.89,7.55,114.38,4.7Z";

const AnimatedVolumeIcon = ({ isMuted, volume }: { isMuted: boolean; volume: number }) => {
  const isMuteActive = isMuted || volume === 0;

  return (
    <div style={{ position: 'relative', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 150 120"
        width="16"
        height="16"
        fill="currentColor"
        style={{ overflow: 'visible' }}
      >
        {/* Static Speaker Body - Never blurs, never changes */}
        <path d={VOLUME_BODY} />

        <AnimatePresence initial={false}>
          {isMuteActive ? (
            <motion.path
              key="mute"
              d={MUTE_X}
              // Adjusting position to match VOLUME_BODY origin
              transform="translate(12.61, -9.64)"
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.9, x: 5 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, x: 0 }}
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.9, x: 5 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            />
          ) : (
            <motion.g
              key="waves"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.2 } }}
            >
              <motion.path
                d={VOLUME_WAVE_INNER}
                initial={{ opacity: 0, filter: 'blur(4px)', x: -2 }}
                animate={{
                  opacity: volume > 0 ? 1 : 0,
                  filter: volume > 0 ? 'blur(0px)' : 'blur(4px)',
                  x: volume > 0 ? 0 : -2
                }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d={VOLUME_WAVE_OUTER}
                initial={{ opacity: 0, filter: 'blur(4px)', x: -4 }}
                animate={{
                  opacity: volume > 0.5 ? 1 : 0,
                  filter: volume > 0.5 ? 'blur(0px)' : 'blur(4px)',
                  x: volume > 0.5 ? 0 : -4
                }}
                transition={{ duration: 0.2, delay: 0.05 }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

const VolumeSlider: React.FC = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const isMuted = usePlayerStore((state) => state.isMuted);
  const toggleMute = usePlayerStore((state) => state.toggleMute);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const showTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const updateVolume = useCallback((clientY: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(rect.bottom - clientY, rect.height));
    const newVolume = y / rect.height;
    setVolume(newVolume);
    
    // Auto-unmute when adjusting volume
    if (isMuted && newVolume > 0) {
      toggleMute();
    }
  }, [setVolume, isMuted, toggleMute]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateVolume(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateVolume(e.touches[0].clientY);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updateVolume(e.clientY);
    const onTouchMove = (e: TouchEvent) => updateVolume(e.touches[0].clientY);
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, updateVolume]);

  const show = () => {
    clearTimeout(hideTimeout.current);
    setIsHovered(true);
  };

  const hide = () => {
    if (isDragging) return;
    hideTimeout.current = setTimeout(() => setIsHovered(false), 250);
  };

  // When drag ends outside popover, close if not still hovered
  useEffect(() => {
    if (!isDragging) {
      hideTimeout.current = setTimeout(() => {
        // only close if still not hovered — the mouse events will re‑trigger show if needed
      }, 300);
    }
  }, [isDragging]);

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className={styles.wrapper} onMouseEnter={show} onMouseLeave={hide}>
      <motion.button
        className={styles.iconButton}
        onClick={toggleMute}
        type="button"
        transition={{ duration: 0.1 }}
      >
        <AnimatedVolumeIcon isMuted={isMuted} volume={volume} />
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.popover}
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className={styles.sliderArea}
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className={styles.track}>
                <div className={styles.fill} style={{ height: `${6 + (displayVolume * 82)}%` }} />
              </div>
              <div
                className={styles.thumb}
                style={{ bottom: `${10 + (displayVolume * 80)}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolumeSlider;
