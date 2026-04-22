'use client';
import { motion, useTransform, useMotionTemplate } from 'framer-motion';
import { useAudioReactiveMotion } from '../hooks/useAudioReactiveMotion';
import Image from 'next/image';

interface MobileReactiveBackgroundProps {
  coverUrl?: string;
  dominantColor?: string;
}

export function MobileReactiveBackground({ coverUrl, dominantColor = '#0f0f23' }: MobileReactiveBackgroundProps) {
  const { bassBoost, trebleBoost } = useAudioReactiveMotion();

  // Масштаб обложки зависит от высоких частот (Ultra x4)
  const scale = useTransform(bassBoost, [0, 1], [1.05, 1.5]);
  // Эффекты зависят от баса (Ultra x4)
  const brightness = useTransform(trebleBoost, [0, 1], [0.6, 0.7]);
  const saturate = useTransform(trebleBoost, [0, 1], [1, 3]);

  // Для того чтобы MotionValue работали внутри строки filter, нужно использовать useMotionTemplate
  const filter = useMotionTemplate`brightness(${brightness}) saturate(${saturate}) blur(30px)`;

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base blurred image */}
      {coverUrl && (
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale, filter }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
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
