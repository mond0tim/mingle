'use client';

import { usePageVisualizerColors } from '../hooks/usePageVisualizerColors';
import type { GradientColors } from '../types';

/**
 * A client component that injects custom colors into the global visualizer
 * background for a specific page. It safely wraps `usePageVisualizerColors`
 * so it can be embedded in Server Components.
 */
export function PageVisualizerColors({ colors }: { colors: GradientColors | any }) {
  usePageVisualizerColors(colors);
  return null;
}
