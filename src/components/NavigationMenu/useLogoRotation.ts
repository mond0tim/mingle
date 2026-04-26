'use client';

import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useAnimationFrame } from 'framer-motion';
import { useAudioReactiveMotion } from '@/features/audio-reactive-visualizer';
import { usePlayerStore } from '@/features/player/store/playerStore';

export function useLogoRotation() {
  const { bpm } = useAudioReactiveMotion();
  const rotation = useMotionValue(0);
  const velocityRef = useRef(0);
  
  const playing = usePlayerStore((s) => s.playing);
  const duration = usePlayerStore((s) => s.duration);
  const handleSeek = usePlayerStore((s) => s.handleSeek);
  const currentSeek = usePlayerStore((s) => s.seek);

  const [isDragging, setIsDragging] = useState(false);
  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);
  const startSeekRef = useRef(0);

  // Auto rotation logic
  useAnimationFrame((_, delta) => {
    if (isDragging) return;

    if (!playing) {
      if (velocityRef.current > 0.01) {
        velocityRef.current *= 0.97;
        rotation.set(rotation.get() + velocityRef.current);
      }
      return;
    }

    const currentBpm = bpm.get() || 100;
    const speed = (currentBpm / 180) * 360; 
    const frameRotation = (speed * delta) / 1000;

    velocityRef.current = frameRotation;
    rotation.set(rotation.get() + frameRotation);
  });

  const getAngle = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleStart = (clientX: number, clientY: number, element: HTMLElement) => {
    setIsDragging(true);
    startAngleRef.current = getAngle(clientX, clientY, element);
    startRotationRef.current = rotation.get();
    startSeekRef.current = currentSeek;

    const handleMove = (moveX: number, moveY: number) => {
      const currentAngle = getAngle(moveX, moveY, element);
      let deltaAngle = currentAngle - startAngleRef.current;

      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      const newRotation = startRotationRef.current + deltaAngle;
      rotation.set(newRotation);

      if (duration > 0) {
        const rotationDelta = newRotation - startRotationRef.current;
        const seekDelta = (rotationDelta / 360) * 10;
        const newSeek = Math.max(0, Math.min(duration, startSeekRef.current + seekDelta));
        handleSeek(newSeek);
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onEnd = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('blur', onEnd);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('blur', onEnd);
  };

  return {
    rotation,
    isDragging,
    handleStart
  };
}
