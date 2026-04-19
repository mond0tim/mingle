'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AudioReactiveLiveCaption,
  defaultVisualizerPrefs,
  loadVisualizerPrefs,
  saveVisualizerPrefs,
  PlayerLinkedVisualizer,
  VisualizerControls,
  type AudioReactiveVisualizerPrefs,
} from '@/features/audio-reactive-visualizer';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { useTrackColor } from '@/features/player/hooks/useTrackColor';
import { trackToGradientColors } from '@/features/audio-reactive-visualizer';

export default function VisualizerPage() {
  const [prefs, setPrefs] = useState<AudioReactiveVisualizerPrefs>(defaultVisualizerPrefs);
  const [hydrated, setHydrated] = useState(false);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const { fullPalette } = useTrackColor(currentTrack);

  useEffect(() => {
    setPrefs(loadVisualizerPrefs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveVisualizerPrefs(prefs);
  }, [prefs, hydrated]);

  const effectiveGradient = useMemo(() => {
    if (prefs.colorMode === 'custom') return prefs.gradientColors;

    const trackWithPalette = currentTrack
      ? ({ ...currentTrack, colors: fullPalette ?? currentTrack.colors } as any)
      : null;

    return trackToGradientColors(trackWithPalette, prefs.gradientColors);
  }, [currentTrack, fullPalette, prefs.colorMode, prefs.gradientColors]);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-zinc-950 font-sans text-white">
      <main className="relative min-h-0 flex-1">
        <PlayerLinkedVisualizer
          bpmSpeedMultiplier={prefs.bpmSpeedMultiplier}
          overrideGradientColors={effectiveGradient}
          title={currentTrack?.title ? currentTrack.title : 'MINGLE'}
        />
      </main>

      <footer className="shrink-0 space-y-3 border-t border-zinc-800 bg-zinc-950/90 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <AudioReactiveLiveCaption className="text-center font-mono text-[11px] text-zinc-400" />
          <p className="mt-1 text-center text-[11px] text-zinc-500">
            Те же значения доступны через{' '}
            <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">useAudioReactiveStore</code> /{' '}
            <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">useAudioReactiveSnapshot</code> в любом
            клиентском компоненте.
          </p>
        </div>
        <VisualizerControls
          gradientColors={prefs.gradientColors}
          onGradientChange={(gradientColors) => setPrefs((p) => ({ ...p, gradientColors }))}
          bpmSpeedMultiplier={prefs.bpmSpeedMultiplier}
          onBpmSpeedMultiplierChange={(bpmSpeedMultiplier) => setPrefs((p) => ({ ...p, bpmSpeedMultiplier }))}
          colorMode={prefs.colorMode}
          onColorModeChange={(colorMode) => setPrefs((p) => ({ ...p, colorMode }))}
        />
      </footer>
    </div>
  );
}
