'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AudioReactiveLiveCaption,
  loadVisualizerPrefs,
  saveVisualizerPrefs,
  VisualizerControls,
  useAudioReactiveStore,
} from '@/features/audio-reactive-visualizer';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { useTrackColor } from '@/features/player/hooks/useTrackColor';
import { trackToGradientColors } from '@/features/audio-reactive-visualizer';
import { useSession } from '@/lib/auth-client';
import { ColorStudio } from '@/components/color-studio/ColorStudio';
import { withDefaultTrackBindings } from '@/lib/colorChannels';
import ColorPaletteDisplay from '@/components/ColorPaletteDisplay/ColorPaletteDisplay';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function VisualizerPage() {
  const prefs = useAudioReactiveStore((s) => s.prefs);
  const setPrefs = useAudioReactiveStore((s) => s.setPrefs);
  const [hydrated, setHydrated] = useState(false);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const updateTrackColors = usePlayerStore((s) => s.updateTrackColors);
  const { fullPalette } = useTrackColor(currentTrack);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const saved = loadVisualizerPrefs();
    setPrefs(saved);
    setHydrated(true);
  }, []);

  // HYDRATION: При смене трека загружаем его персональные настройки, если они есть в БД
  useEffect(() => {
    if (!currentTrack || !hydrated) return;

    const trackVisuals = (currentTrack.colors as any)?.visualizer;
    if (trackVisuals) {
      setPrefs({
        bpmSpeedMultiplier: trackVisuals.bpmSpeedMultiplier ?? prefs.bpmSpeedMultiplier,
        smoothColorTransitions: trackVisuals.smoothColorTransitions ?? prefs.smoothColorTransitions,
        colorBrightness: trackVisuals.colorBrightness ?? prefs.colorBrightness,
      });
    }
  }, [currentTrack?.id, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveVisualizerPrefs(prefs);
  }, [prefs, hydrated]);

  const handleSaveConfig = async () => {
    if (!currentTrack || isSaving) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const visualizerSettings = {
        bpmSpeedMultiplier: prefs.bpmSpeedMultiplier,
        smoothColorTransitions: prefs.smoothColorTransitions,
        colorBrightness: prefs.colorBrightness,
      };

      const updatedColors = {
        ...(currentTrack.colors as any || {}),
        visualizer: visualizerSettings,
      };

      const res = await fetch('/api/admin/tracks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentTrack.id,
          colors: updatedColors,
        }),
      });

      if (!res.ok) throw new Error('Failed to save track config');

      updateTrackColors(String(currentTrack.id), updatedColors);
      setSaveStatus('success');
      toast.success('Настройки визуализатор сохранены для этого трека');

      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  };

  const effectiveGradient = useMemo(() => {
    if (prefs.colorMode === 'custom') return prefs.gradientColors;

    const trackWithPalette = currentTrack
      ? ({ ...currentTrack, colors: fullPalette ?? currentTrack.colors } as any)
      : null;

    return trackToGradientColors(trackWithPalette, prefs.gradientColors);
  }, [currentTrack, fullPalette, prefs.colorMode, prefs.gradientColors]);

  const channelLabels = useMemo(() => {
    const trackColors = (fullPalette ?? currentTrack?.colors) as any;
    const b = withDefaultTrackBindings(trackColors?.bindings);
    return {
      start: b?.visualizerStart?.manual ? 'man' : b?.visualizerStart?.channel ?? 'auto',
      mid: b?.visualizerMid?.manual ? 'man' : b?.visualizerMid?.channel ?? 'auto',
      end: b?.visualizerEnd?.manual ? 'man' : b?.visualizerEnd?.channel ?? 'auto',
    };
  }, [currentTrack?.colors, fullPalette]);

  return (
    <div className="flex flex-col bg-transparent font-sans text-white min-h-screen selection:bg-zinc-100 selection:text-zinc-900 justify-end">
      <footer className="mt-[120vh] relative z-10 shrink-0 space-y-8 border-t border-zinc-800 bg-zinc-950/60 p-8 backdrop-blur-xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-7xl">
          <VisualizerControls
            gradientColors={prefs.gradientColors}
            resolvedGradientColors={effectiveGradient}
            channelLabels={channelLabels}
            onGradientChange={(gradientColors) => setPrefs({ gradientColors })}
            bpmSpeedMultiplier={prefs.bpmSpeedMultiplier}
            onBpmSpeedMultiplierChange={(bpmSpeedMultiplier) => setPrefs({ bpmSpeedMultiplier })}
            colorMode={prefs.colorMode}
            onColorModeChange={(colorMode) => setPrefs({ colorMode })}
            smoothColorTransitions={prefs.smoothColorTransitions}
            onSmoothColorTransitionsChange={(smoothColorTransitions) => setPrefs({ smoothColorTransitions })}
            colorBrightness={prefs.colorBrightness}
            onColorBrightnessChange={(colorBrightness) => setPrefs({ colorBrightness })}
          />

          {isAdmin && currentTrack && (
            <div className="mt-12 pt-12 border-t border-zinc-900">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">Live Color Studio</h2>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Real-time color management for: {currentTrack.title}</p>
                </div>
                <Button
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                  className={cn(
                    "rounded-2xl px-6 py-6 font-bold uppercase tracking-widest gap-2 transition-all shadow-xl",
                    saveStatus === 'success'
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-zinc-100 text-zinc-900 hover:bg-white shadow-white/5"
                  )}
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin" /> : saveStatus === 'success' ? <CheckCircle2 className="size-4" /> : <Save className="size-4" />}
                  {isSaving ? 'Сохранение...' : saveStatus === 'success' ? 'Сохранено' : 'Закрепить настройки'}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                  <ColorStudio
                    colors={currentTrack.colors}
                    onChange={(newColors) => updateTrackColors(String(currentTrack.id), newColors)}
                    coverUrl={currentTrack.cover}
                    showReextract={true}
                  />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Current Track Palette</h3>
                    <ColorPaletteDisplay />
                  </div>
                  <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md">
                    <AudioReactiveLiveCaption className="font-mono text-[11px] text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
