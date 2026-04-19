'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { Howler } from 'howler';
import { useTrackColor } from '@/features/player/hooks/useTrackColor';
import { usePlayerStore } from '@/features/player/store/playerStore';
import type { GradientColors } from '../types';
import { useAudioReactiveStore } from '../store/audioReactiveStore';
import { trackToGradientColors } from '../lib/trackGradient';
import { ShaderBackground } from './ShaderBackground';
import { MotionCanvas } from './MotionCanvas';
import { UIOverlay } from './UIOverlay';
import { BPMDetector } from './BPMDetector';

// Shared analyzer to avoid duplicate connectInput problems
let sharedAnalyzer: AudioMotionAnalyzer | null = null;
let connectedAudioElement: HTMLMediaElement | null = null;

function getHowlerMediaElement(howlerInstance: any): HTMLMediaElement | null {
  const node = howlerInstance?._sounds?.[0]?._node;
  return node instanceof HTMLMediaElement ? node : null;
}

export function PlayerLinkedVisualizer({
  bpmSpeedMultiplier,
  overrideGradientColors,
  title,
}: {
  bpmSpeedMultiplier: number;
  overrideGradientColors?: GradientColors;
  title?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const howlerInstance = usePlayerStore((s) => s.howlerInstance);
  const { fullPalette } = useTrackColor(currentTrack);

  const [ready, setReady] = useState(false);

  const bpm = useAudioReactiveStore((s) => s.bpm);
  const bpmStatus = useAudioReactiveStore((s) => s.bpmStatus);
  const setBpm = useAudioReactiveStore((s) => s.setBpm);
  const setBpmStatus = useAudioReactiveStore((s) => s.setBpmStatus);

  const gradientColors = useMemo(() => {
    if (overrideGradientColors) return overrideGradientColors;
    // currentTrack in store should be updated when colors extracted
    const track = currentTrack ? ({ ...currentTrack, colors: fullPalette ?? currentTrack.colors } as any) : null;
    return trackToGradientColors(track, { start: '#B9C8E9', mid: '#FE94D2', end: '#0245C8' });
  }, [overrideGradientColors, currentTrack, fullPalette]);

  useEffect(() => {
    const store = useAudioReactiveStore.getState();
    store.acquireSession();
    store.setBpm(null);
    store.setBpmStatus('Ожидание...'); // will switch to 'Анализ...' / 'Онлайн' from detector
    return () => store.releaseSession();
  }, []);

  // Initialize analyzer once and attach canvas
  useEffect(() => {
    if (!containerRef.current) return;

    if (!sharedAnalyzer) {
      sharedAnalyzer = new AudioMotionAnalyzer(containerRef.current, {
        useCanvas: true,
        bgAlpha: 0,
        overlay: true,
        smoothing: 0.7,
        mode: 10,
        height: 256,
        audioCtx: Howler.ctx,
      } as any);
    } else {
      // Ensure canvas is mounted into this container
      if (!containerRef.current.contains(sharedAnalyzer.canvas)) {
        containerRef.current.appendChild(sharedAnalyzer.canvas);
      }
    }

    setReady(true);
  }, []);

  // Connect analyzer to Howler's underlying HTMLMediaElement, safely
  useEffect(() => {
    if (!ready || !sharedAnalyzer) return;

    const connectToHowler = () => {
      const mediaEl = getHowlerMediaElement(howlerInstance);
      if (!mediaEl) return;

      if (connectedAudioElement === mediaEl) return;

      if (mediaEl.crossOrigin !== 'anonymous') {
        mediaEl.crossOrigin = 'anonymous';
      }

      try {
        sharedAnalyzer.disconnectInput();
        sharedAnalyzer.connectInput(mediaEl);
        connectedAudioElement = mediaEl;
      } catch {
        // In strict mode/HMR we may hit InvalidStateError; keep reference to avoid reconnect loops
        connectedAudioElement = mediaEl;
      }
    };

    const interval = window.setInterval(connectToHowler, 500);
    return () => window.clearInterval(interval);
  }, [ready, howlerInstance, currentTrack]);

  // Publish bands to global store
  useEffect(() => {
    if (!ready || !sharedAnalyzer) return;

    let raf = 0;
    let tick = 0;
    const loop = () => {
      tick += 1;
      if (tick % 2 === 0) {
        useAudioReactiveStore.getState().setBands({
          bass: sharedAnalyzer!.getEnergy('bass'),
          mid: sharedAnalyzer!.getEnergy('mid'),
          treble: sharedAnalyzer!.getEnergy('treble'),
        });
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  const analyzerLike = sharedAnalyzer
    ? ({
        getEnergy: (band: string) => sharedAnalyzer!.getEnergy(band),
        setOptions: (opts: any) => sharedAnalyzer!.setOptions(opts),
        registerGradient: (name: string, def: any) => sharedAnalyzer!.registerGradient(name, def),
        canvas: sharedAnalyzer.canvas,
        audioCtx: sharedAnalyzer.audioCtx,
        connectedSources: (sharedAnalyzer as any).connectedSources,
      } as any)
    : null;

  return (
    <div className="absolute inset-0 overflow-hidden font-mono">
      {/* container only used to host analyzer canvas */}
      <div ref={containerRef} className="pointer-events-none absolute inset-0" />

      <ShaderBackground
        analyzer={analyzerLike}
        gradientColors={gradientColors}
        bpm={bpm}
        bpmSpeedMultiplier={bpmSpeedMultiplier}
      />

      <MotionCanvas analyzer={analyzerLike} gradientColors={gradientColors} />

      <UIOverlay analyzer={analyzerLike} bpm={bpm} bpmStatus={bpmStatus} title={title ?? 'MINGLE'} />

      <BPMDetector
        audioCtx={analyzerLike?.audioCtx}
        sourceNode={analyzerLike?.connectedSources?.[0]}
        onBpmChange={setBpm}
        onStatusChange={setBpmStatus}
      />
    </div>
  );
}

