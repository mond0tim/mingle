'use client';
import { motion, useTransform, useMotionTemplate } from 'framer-motion';
import { useAudioReactiveMotion } from '../hooks/useAudioReactiveMotion';
import Image from 'next/image';
import { usePlayerStore } from '@/features/player/store/playerStore';

interface MobileReactiveBackgroundProps {
  coverUrl?: string;
  dominantColor?: string;
}

export function MobileReactiveBackground({ coverUrl, dominantColor = '#0f0f23' }: MobileReactiveBackgroundProps) {
  const { bassBoost } = useAudioReactiveMotion();
  const playing = usePlayerStore(state => state.playing);

  // Только масштаб остается реактивным (самый легкий для GPU эффект)
  const scale = useTransform(bassBoost, [0, 1], [1.1, 1.5]);

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base blurred image */}
      {coverUrl && (
        <motion.div
          className="absolute inset-0 origin-center"
          style={{
            scale,
          }}
          animate={{
            opacity: playing ? 0.6 : 0.4,
            filter: playing ? 'blur(40px) brightness(0.3) saturate(0.6)' : 'blur(40px) brightness(0.7) saturate(3.5)'
          }}
        >
          <Image
            src={coverUrl}
            alt="Blurred background cover"
            fill
            className="object-cover opacity-50 "
            priority
          />
        </motion.div>
      )}

      {/* Overlay with dominant transparent color and blur filter */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `color-mix(in srgb, var(--dominant-background-color) 50%, black)`
        }}
      />
    </div>
  );
}
