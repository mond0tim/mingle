'use client';

import React, { useEffect, useRef } from 'react';
import type { GradientColors } from '../types';

interface MotionCanvasProps {
  analyzer: {
    setOptions: (opts: Record<string, unknown>) => void;
    registerGradient: (name: string, def: unknown) => void;
    canvas?: HTMLCanvasElement;
  } | null;
  gradientColors: GradientColors;
  height?: number;
  mode?: number;
  showScaleY?: boolean;
  overlay?: boolean;
  bgAlpha?: number;
  smoothing?: number;
  className?: string;
}

export const MotionCanvas: React.FC<MotionCanvasProps> = ({
  analyzer,
  gradientColors,
  height = 256,
  mode = 10,
  showScaleY = false,
  overlay = true,
  bgAlpha = 0,
  smoothing = 0.7,
  className = 'absolute bottom-22 left-0 h-64 w-full blur-[80px] filter',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analyzer && containerRef.current) {
      analyzer.setOptions({
        height,
        mode,
        showScaleY,
        overlay,
        bgAlpha,
        smoothing,
      });

      if (analyzer.canvas && !containerRef.current.contains(analyzer.canvas)) {
        containerRef.current.appendChild(analyzer.canvas);
      }

      analyzer.registerGradient('custom-gradient', {
        colorStops: [
          { color: gradientColors.start, pos: 0 },
          { color: gradientColors.mid, pos: 0.5 },
          { color: gradientColors.end, pos: 1 },
        ],
        dir: 'v',
      });
      analyzer.setOptions({ gradient: 'custom-gradient' });
    }
  }, [analyzer, height, mode, showScaleY, overlay, bgAlpha, smoothing, gradientColors]);

  useEffect(() => {
    if (analyzer) {
      analyzer.registerGradient('custom-gradient', {
        colorStops: [
          { color: gradientColors.start, pos: 0 },
          { color: gradientColors.mid, pos: 0.5 },
          { color: gradientColors.end, pos: 1 },
        ],
        dir: 'v',
      });
      analyzer.setOptions({ gradient: 'custom-gradient' });
    }
  }, [analyzer, gradientColors]);

  return <div ref={containerRef} className={className} />;
};
