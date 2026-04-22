'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useAudioReactiveMotion, useAudioReactiveStore } from '@/features/audio-reactive-visualizer';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { Disc3 } from 'lucide-react';

export default function BPMRotator() {
  const { bpm } = useAudioReactiveMotion();
  const rotation = useMotionValue(0);
  const velocityRef = useRef(0); // Tracks current rotation speed for smooth stop
  const playing = usePlayerStore((s) => s.playing);
  const displayBpm = useAudioReactiveStore((s) => s.bpm);

  useAnimationFrame((time, delta) => {
    if (!playing) {
      // Еще более плавное замедление (0.97 дает длинный "хвост" инерции)
      if (velocityRef.current > 0.01) {
        velocityRef.current *= 0.97; 
        rotation.set(rotation.get() + velocityRef.current);
      }
      return;
    }

    const currentBpm = bpm.get() || 100;
    
    // НАСТРОЙКА СКОРОСТИ: Число 180 — это "передача". 
    // Чем оно меньше (например, 120), тем быстрее крутится диск.
    const speed = (currentBpm / 180) * 360; 
    const frameRotation = (speed * delta) / 1000;

    velocityRef.current = frameRotation;
    rotation.set(rotation.get() + frameRotation);
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 backdrop-blur-md h-40">
      <motion.div
        style={{ rotate: rotation, scale: 1.2 }}
        className="text-zinc-100"
      >
        <Disc3 size={48} />
      </motion.div>
      <div className="mt-4 flex flex-col items-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">BPM Vinyl</div>
        <div className="text-[8px] font-mono text-zinc-600 mt-0.5">{displayBpm ? Math.round(displayBpm) : '--'} BPM</div>
      </div>
    </div>
  );
}
