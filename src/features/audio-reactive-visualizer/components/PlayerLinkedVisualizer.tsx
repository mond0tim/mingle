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
  title,
  showUI = false,
}: {
  title?: string;
  showUI?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const howlerInstance = usePlayerStore((s) => s.howlerInstance);
  const { fullPalette } = useTrackColor(currentTrack);

  const [ready, setReady] = useState(false);

  // Store values
  const bpm = useAudioReactiveStore((s) => s.bpm);
  const bpmStatus = useAudioReactiveStore((s) => s.bpmStatus);
  const setBpm = useAudioReactiveStore((s) => s.setBpm);
  const setBpmStatus = useAudioReactiveStore((s) => s.setBpmStatus);

  const prefs = useAudioReactiveStore((s) => s.prefs);
  const pageColors = useAudioReactiveStore((s) => s.pageColors);

  const gradientColors = useMemo(() => {
    // If we have page colors set, use them
    if (pageColors) {
      if ('start' in pageColors && 'mid' in pageColors && 'end' in pageColors) {
        return pageColors as GradientColors;
      }
      return trackToGradientColors({ colors: pageColors } as any, prefs.gradientColors);
    }

    if (prefs.colorMode === 'custom') return prefs.gradientColors;

    // Default: use track colors or fallback to gradientColors
    const track = currentTrack ? ({ ...currentTrack, colors: fullPalette ?? currentTrack.colors } as any) : null;
    return trackToGradientColors(track, prefs.gradientColors);
  }, [pageColors, prefs.colorMode, prefs.gradientColors, currentTrack, fullPalette]);

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
        sharedAnalyzer?.disconnectInput();
        sharedAnalyzer?.connectInput(mediaEl);
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
    const isMobile = window.innerWidth <= 768;
    let lastTime = 0;
    const interval = isMobile ? 1000 / 30 : 0; // 30fps on mobile, 60fps on desktop

    const loop = (time: number) => {
      const isPlaying = usePlayerStore.getState().playing;
      
      if (isPlaying) {
        if (!interval || time - lastTime >= interval) {
          useAudioReactiveStore.getState().setBands({
            bass: sharedAnalyzer!.getEnergy('bass' as any),
            mid: sharedAnalyzer!.getEnergy('mid' as any),
            treble: sharedAnalyzer!.getEnergy('treble' as any),
          });
          lastTime = time;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  const analyzerLike = sharedAnalyzer
    ? ({
      getEnergy: (band: string) => sharedAnalyzer?.getEnergy(band as any),
      setOptions: (opts: any) => sharedAnalyzer?.setOptions(opts),
      registerGradient: (name: string, def: any) => sharedAnalyzer?.registerGradient(name, def),
      canvas: sharedAnalyzer.canvas,
      audioCtx: sharedAnalyzer.audioCtx,
      connectedSources: (sharedAnalyzer as any).connectedSources,
    } as any)
    : null;

  return (
    <div className="fixed inset-0 overflow-hidden font-mono z-[-1] pointer-events-none">
      {/* container only used to host analyzer canvas */}
      <div ref={containerRef} className="pointer-events-none absolute inset-0" />
      <div className="noise-overlay-transparent" />
      <ShaderBackground
        analyzer={analyzerLike}
        gradientColors={gradientColors}
        bpm={bpm}
        bpmSpeedMultiplier={prefs.bpmSpeedMultiplier}
        smoothColorTransitions={prefs.smoothColorTransitions}
        colorBrightness={prefs.colorBrightness}
      />

      <MotionCanvas analyzer={analyzerLike} gradientColors={gradientColors} />

      {showUI && (
        <UIOverlay analyzer={analyzerLike} bpm={bpm} bpmStatus={bpmStatus} title={title ?? 'MINGLE'} />
      )}

      <BPMDetector
        audioCtx={analyzerLike?.audioCtx}
        sourceNode={analyzerLike?.connectedSources?.[0]}
        onBpmChange={setBpm}
        onStatusChange={setBpmStatus}
      />
    </div>
  );
}

