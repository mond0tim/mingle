import type { Track } from '@/types';
import type { GradientColors } from '../types';

const FALLBACK: GradientColors = { start: '#B9C8E9', mid: '#FE94D2', end: '#0245C8' };

export function trackToGradientColors(track: Track | null | undefined, fallback: GradientColors = FALLBACK): GradientColors {
  if (!track) return fallback;

  const c = track.colors ?? null;
  if (c?.dominant && c?.accent) {
    // Best-effort: fill 3 stops from palette if available
    const palette = Array.isArray(c.palette) ? c.palette.filter(Boolean) : [];
    const end =
      c.darkVibrant ||
      c.darkMuted ||
      palette[palette.length - 1] ||
      c.muted ||
      c.vibrant ||
      c.accent;

    return {
      start: c.dominant,
      mid: c.accent,
      end,
    };
  }

  // fallback: some tracks only have `color`
  if (track.color) {
    return { start: track.color, mid: fallback.mid, end: fallback.end };
  }

  return fallback;
}

