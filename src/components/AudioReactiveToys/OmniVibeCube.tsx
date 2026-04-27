'use client';

import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useAudioReactiveMotion } from '@/features/audio-reactive-visualizer';

export default function OmniVibeCube() {
  const { bassBoost, midBoost, trebleUltra } = useAudioReactiveMotion();
  
  // Bass -> Scale
  const scale = useSpring(useTransform(bassBoost, [0, 1], [0.85, 1.45]), { damping: 15, stiffness: 200 });
  
  // Mid -> Skew
  const skew = useSpring(useTransform(midBoost, [0, 1], [-25, 25]), { damping: 20, stiffness: 100 });
  
  // Treble -> Border Radius & Glow
  const radius = useSpring(useTransform(trebleUltra, [0, 1], [8, 60]), { damping: 10, stiffness: 300 });
  const glow = useSpring(useTransform(trebleUltra, [0, 1], [0, 60]), { damping: 10, stiffness: 300 });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-950/80 rounded-3xl border border-zinc-800 backdrop-blur-md h-64 col-span-full lg:col-span-1">
      <motion.div
        style={{ 
          scale, 
          skewX: skew, 
          borderRadius: radius,
          boxShadow: useTransform(glow, (v) => `0 0 ${v}px rgba(168, 85, 247, 0.4)`)
        }}
        className="size-32 bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 relative"
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </motion.div>
      <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">Omni-Reactive Core</div>
    </div>
  );
}
