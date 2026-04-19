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
import { useSession } from '@/lib/auth-client';
import { ColorStudioSheet } from '@/components/color-studio/ColorStudioSheet';
import { withDefaultTrackBindings } from '@/lib/colorChannels';
import ColorPaletteDisplay from '@/components/ColorPaletteDisplay/ColorPaletteDisplay';

export default function VisualizerPage() {
  const [prefs, setPrefs] = useState<AudioReactiveVisualizerPrefs>(defaultVisualizerPrefs);
  const [hydrated, setHydrated] = useState(false);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const updateTrackColors = usePlayerStore((s) => s.updateTrackColors);
  const { fullPalette } = useTrackColor(currentTrack);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

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

  const channelLabels = useMemo(() => {
    const b = withDefaultTrackBindings((currentTrack?.colors as any)?.bindings);
    return {
      start: b?.visualizerStart?.manual ? 'manual' : b?.visualizerStart?.channel ?? 'auto',
      mid: b?.visualizerMid?.manual ? 'manual' : b?.visualizerMid?.channel ?? 'auto',
      end: b?.visualizerEnd?.manual ? 'manual' : b?.visualizerEnd?.channel ?? 'auto',
    };
  }, [currentTrack?.colors]);

  return (
    <div className="flex flex-col overflow-hidden bg-zinc-950 font-sans text-white">
      <main className="relative min-h-[120dvh] flex-1">
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
          {isAdmin && currentTrack && (
            <div className="mt-2 flex items-center justify-center">
              <ColorStudioSheet
                entityType="track"
                entityId={String(currentTrack.id)}
                coverUrl={currentTrack.cover}
                initialColors={currentTrack.colors}
                triggerLabel="Color Studio (Live)"
                onSaved={(colors) => updateTrackColors(String(currentTrack.id), colors)}
              />
            </div>
          )}
        </div>
        <VisualizerControls
          gradientColors={prefs.gradientColors}
          resolvedGradientColors={effectiveGradient}
          channelLabels={channelLabels}
          onGradientChange={(gradientColors) => setPrefs((p) => ({ ...p, gradientColors }))}
          bpmSpeedMultiplier={prefs.bpmSpeedMultiplier}
          onBpmSpeedMultiplierChange={(bpmSpeedMultiplier) => setPrefs((p) => ({ ...p, bpmSpeedMultiplier }))}
          colorMode={prefs.colorMode}
          onColorModeChange={(colorMode) => setPrefs((p) => ({ ...p, colorMode }))}
        />
      </footer>
      <div className="px-4">
        <ColorPaletteDisplay />
      </div>
    </div>
  );
}
