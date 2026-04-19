import type { AudioReactiveVisualizerPrefs, GradientColors } from '../types';

const STORAGE_KEY = 'mingle:audio-reactive-visualizer:prefs';

const defaultGradient: GradientColors = {
  start: '#B9C8E9',
  mid: '#FE94D2',
  end: '#0245C8',
};

export const defaultVisualizerPrefs: AudioReactiveVisualizerPrefs = {
  gradientColors: defaultGradient,
  bpmSpeedMultiplier: 1.5,
  colorMode: 'track',
};

export function loadVisualizerPrefs(): AudioReactiveVisualizerPrefs {
  if (typeof window === 'undefined') return defaultVisualizerPrefs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVisualizerPrefs;
    const parsed = JSON.parse(raw) as Partial<AudioReactiveVisualizerPrefs>;
    return {
      gradientColors: {
        start: typeof parsed.gradientColors?.start === 'string' ? parsed.gradientColors.start : defaultGradient.start,
        mid: typeof parsed.gradientColors?.mid === 'string' ? parsed.gradientColors.mid : defaultGradient.mid,
        end: typeof parsed.gradientColors?.end === 'string' ? parsed.gradientColors.end : defaultGradient.end,
      },
      bpmSpeedMultiplier:
        typeof parsed.bpmSpeedMultiplier === 'number' && Number.isFinite(parsed.bpmSpeedMultiplier)
          ? parsed.bpmSpeedMultiplier
          : defaultVisualizerPrefs.bpmSpeedMultiplier,
      colorMode: parsed.colorMode === 'custom' ? 'custom' : 'track',
    };
  } catch {
    return defaultVisualizerPrefs;
  }
}

export function saveVisualizerPrefs(prefs: AudioReactiveVisualizerPrefs) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota / private mode */
  }
}
