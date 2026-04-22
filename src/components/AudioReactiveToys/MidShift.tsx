'use client';

import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useAudioReactiveMotion } from '@/features/audio-reactive-visualizer';

export default function MidShift() {
  const { midBoost } = useAudioReactiveMotion();
  
  const xShift = useTransform(midBoost, [0, 1], [0, 60]);
  const skew = useTransform(midBoost, [0, 1], [0, 25]);
  const smootherX = useSpring(xShift, { damping: 20, stiffness: 100 });
  const smootherSkew = useSpring(skew, { damping: 20, stiffness: 100 });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 backdrop-blur-md h-40 overflow-hidden">
      <div className="relative w-full flex justify-center">
        <motion.div
          style={{ x: smootherX, skewX: smootherSkew }}
          className="h-1 w-32 bg-indigo-400 rounded-full"
        />
        <motion.div
           style={{ x: useTransform(smootherX, (v) => -v), skewX: useTransform(smootherSkew, (v) => -v) }}
           className="absolute h-1 w-32 bg-purple-400 rounded-full opacity-50 blur-[2px]"
        />
      </div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">Mid-Range Shift</div>
    </div>
  );
}
