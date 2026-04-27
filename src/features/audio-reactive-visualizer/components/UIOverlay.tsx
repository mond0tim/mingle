'use client';

import React, { useEffect, useRef } from 'react';

interface UIOverlayProps {
  analyzer: { getEnergy: (band: string) => number } | null;
  bpm: number | null;
  bpmStatus: string;
  title?: string;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  analyzer,
  bpm,
  bpmStatus,
  title = 'VISUALIZER',
}) => {
  const bassDotRef = useRef<HTMLDivElement>(null);
  const midDotRef = useRef<HTMLDivElement>(null);
  const trebleDotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const render = () => {
      if (analyzer) {
        const bass = analyzer.getEnergy('bass');
        const mid = analyzer.getEnergy('mid');
        const treble = analyzer.getEnergy('treble');

        const dots = [bassDotRef, midDotRef, trebleDotRef];
        const energies = [bass, mid, treble];

        dots.forEach((dotRef, index) => {
          const energy = energies[index];
          const scale = 1 + energy * 1.5;
          if (dotRef.current) {
            dotRef.current.style.transform = `scale(${scale})`;
            dotRef.current.style.opacity = `${0.5 + energy * 0.5}`;
            dotRef.current.style.filter = `blur(${energy * 8}px) brightness(${1 + energy * 0.4})`;
          }
        });

        if (textRef.current) {
          const newWeight = Math.floor(100 + bass * 800);
          textRef.current.style.fontWeight = `${newWeight}`;
        }
      }
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [analyzer]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center space-y-20">
      <div
        ref={textRef}
        className="font-neue-regrade text-7xl tracking-widest text-white transition-all duration-75 ease-out"
      >
        {title}
      </div>

      <div className="flex flex-col items-center space-y-2 font-mono">
        <div className="text-4xl font-bold text-white/90">
          {bpm ? bpm : '--'} <span className="text-xl text-white/70">BPM</span>
        </div>
        <div className="text-sm tracking-widest text-white/50 uppercase">{bpmStatus}</div>
      </div>

      <div className="flex max-w-xs w-full items-center justify-around">
        <div
          ref={bassDotRef}
          className="h-8 w-8 rounded-full bg-white transition-transform duration-75 ease-out"
        />
        <div
          ref={midDotRef}
          className="h-8 w-8 rounded-full bg-white transition-transform duration-75 ease-out"
        />
        <div
          ref={trebleDotRef}
          className="h-8 w-8 rounded-full bg-white transition-transform duration-75 ease-out"
        />
      </div>
    </div>
  );
};
