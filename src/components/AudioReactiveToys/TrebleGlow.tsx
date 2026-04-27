'use client';

import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useAudioReactiveMotion } from '@/features/audio-reactive-visualizer';

export default function TrebleGlow() {
  const { trebleUltra } = useAudioReactiveMotion();
  
  const brightness = useTransform(trebleUltra, [0, 0.4, 1], [0.3, 0.8, 1.8]);
  const glow = useTransform(trebleUltra, [0, 1], [0, 50]);
  const smoothBrightness = useSpring(brightness, { damping: 10, stiffness: 300 });
  const smoothGlow = useSpring(glow, { damping: 10, stiffness: 300 });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 backdrop-blur-md h-40">
      <motion.div
        style={{ 
          opacity: smoothBrightness,
          boxShadow: useTransform(smoothGlow, (v) => `0 0 ${v}px rgba(255,255,255,0.8)`)
        }}
        className="size-4 bg-white rounded-full"
      />
      <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Treble Spark</div>
    </div>
  );
}
