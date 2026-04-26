'use client';

import React, { useEffect, useState } from 'react';
import { ShaderBackground } from './ShaderBackground';
import { UIOverlay } from './UIOverlay';
import { MotionCanvas } from './MotionCanvas';
import { BPMDetector } from './BPMDetector';
import type { GradientColors } from '../types';
import { useAudioReactiveStore } from '../store/audioReactiveStore';

type AudioMotionInstance = {
  destroy: () => void;
  audioCtx?: AudioContext;
  connectedSources?: AudioNode[];
  getEnergy: (band: string) => number;
  setOptions: (opts: Record<string, unknown>) => void;
  registerGradient: (name: string, def: unknown) => void;
  canvas?: HTMLCanvasElement;
};

interface VisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  gradientColors: GradientColors;
  bpmSpeedMultiplier?: number;
  title?: string;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  audioRef,
  gradientColors,
  bpmSpeedMultiplier = 1.5,
  title = 'MINGLE',
}) => {
  const [analyzer, setAnalyzer] = useState<AudioMotionInstance | null>(null);

  const bpm = useAudioReactiveStore((s) => s.bpm);
  const bpmStatus = useAudioReactiveStore((s) => s.bpmStatus);
  const setBpm = useAudioReactiveStore((s) => s.setBpm);
  const setBpmStatus = useAudioReactiveStore((s) => s.setBpmStatus);

  useEffect(() => {
    const store = useAudioReactiveStore.getState();
    store.acquireSession();
    store.setBpm(null);
    store.setBpmStatus('Ожидание...');
    return () => {
      store.releaseSession();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    let am: AudioMotionInstance | undefined;

    void import('audiomotion-analyzer').then(({ default: AudioMotionAnalyzer }) => {
      am = new AudioMotionAnalyzer(undefined, {
        source: audioRef.current || undefined,
        useCanvas: true,
      }) as AudioMotionInstance;
      setAnalyzer(am);
    });

    return () => {
      if (am) am.destroy();
    };
  }, [audioRef]);

  useEffect(() => {
    if (!analyzer) return;

    let raf = 0;
    let tick = 0;

    const loop = () => {
      useAudioReactiveStore.getState().setBands({
        bass: analyzer.getEnergy('bass'),
        mid: analyzer.getEnergy('mid'),
        treble: analyzer.getEnergy('treble'),
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [analyzer]);

  return (
    <div className="absolute inset-0 overflow-hidden font-mono">
      <ShaderBackground
        analyzer={analyzer}
        gradientColors={gradientColors}
        bpm={bpm}
        bpmSpeedMultiplier={bpmSpeedMultiplier}
      />

      <MotionCanvas analyzer={analyzer} gradientColors={gradientColors} />

      <UIOverlay analyzer={analyzer} bpm={bpm} bpmStatus={bpmStatus} title={title} />

      <BPMDetector
        audioCtx={analyzer?.audioCtx}
        sourceNode={analyzer?.connectedSources?.[0]}
        onBpmChange={setBpm}
        onStatusChange={setBpmStatus}
      />
    </div>
  );
};

export default Visualizer;
