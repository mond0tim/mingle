'use client';

import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useAudioReactiveMotion } from '@/features/audio-reactive-visualizer';

export default function BassPulse() {
  const { bassBoost } = useAudioReactiveMotion();
  
  // bassBoost is state.bass * 2 (clamped to 1)
  const scaleValue = useTransform(bassBoost, [0, 0.5, 1], [1, 1.15, 1.35]);
  const smoothScale = useSpring(scaleValue, { damping: 15, stiffness: 200 });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 backdrop-blur-md overflow-hidden h-40">
      <motion.div
        style={{ scale: smoothScale }}
        className="size-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center justify-center"
      >
        <div className="size-10 rounded-full border-2 border-white/20" />
      </motion.div>
      <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Bass Sub-Woofer</div>
    </div>
  );
}
