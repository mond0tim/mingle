'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import styles from './VolumeSlider.module.css';
import { Volume1, Volume2, VolumeX } from 'lucide-react';

const VolumeSlider: React.FC = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const isMuted = usePlayerStore((state) => state.isMuted);
  const toggleMute = usePlayerStore((state) => state.toggleMute);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateVolume = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newVolume = x / rect.width;
    setVolume(newVolume);
  }, [setVolume]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateVolume(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateVolume(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateVolume(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateVolume(e.touches[0].clientX);
    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, updateVolume]);

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className={styles.volumeContainer}>
      <div className={styles.volumeIcon} onClick={toggleMute}>
        {isMuted || volume === 0 ? (
          <VolumeX size={18} />
        ) : volume < 0.5 ? (
          <Volume1 size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </div>
      
      <div 
        className={styles.sliderContainer}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className={styles.sliderTrack}>
          <div 
            className={styles.sliderProgress} 
            style={{ width: `${displayVolume * 100}%` }}
          />
        </div>
        <div 
          className={styles.sliderThumb}
          style={{ left: `${displayVolume * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
