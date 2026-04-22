'use client'
import { useEffect } from 'react';
import { useAudioReactiveStore } from '../store/audioReactiveStore';
import type { GradientColors } from '../types';

/**
 * Hook to inject custom colors into the global visualizer background
 * for a specific page. Colors will be reset when the page unmounts.
 * 
 * @param colors Gradient colors (start, mid, end) to apply to the visualizer
 */
export function usePageVisualizerColors(colors: GradientColors) {
  useEffect(() => {
    // Set the colors when the component mounts
    useAudioReactiveStore.getState().setPageColors(colors);

    // Clean up when the component unmounts
    return () => {
      useAudioReactiveStore.getState().setPageColors(null);
    };
  }, [colors.start, colors.mid, colors.end]);
}
