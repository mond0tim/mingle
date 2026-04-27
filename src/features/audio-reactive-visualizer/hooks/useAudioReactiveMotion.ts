import { useMotionValue, useAnimationFrame } from 'framer-motion';
import { useAudioReactiveStore } from '../store/audioReactiveStore';

/**
 * A highly performant hook that pipes audio reactive data from the Zustand store
 * directly into Framer Motion values without triggering React re-renders.
 */
export function useAudioReactiveMotion() {
  const bass = useMotionValue(0);
  const mid = useMotionValue(0);
  const treble = useMotionValue(0);

  const bassSubtle = useMotionValue(0);
  const bassBoost = useMotionValue(0);
  const midBoost = useMotionValue(0);
  const trebleBoost = useMotionValue(0);

  const bassUltra = useMotionValue(0);
  const midUltra = useMotionValue(0);
  const trebleUltra = useMotionValue(0);

  const bpm = useMotionValue(0);

  useAnimationFrame(() => {
    const state = useAudioReactiveStore.getState();
    
    // Raw (0...1 ideally)
    bass.set(state.bass);
    mid.set(state.mid);
    treble.set(state.treble);

    // Suble (x0.5) - Good for small subtle movements
    bassSubtle.set(state.bass * 0.5);

    // Boosted (x1.5) - More sensitive but less likely to hit ceiling than x2
    bassBoost.set(state.bass * 1.5);
    midBoost.set(state.mid * 1.5);
    trebleBoost.set(state.treble * 1.5);

    // Ultra (x2.5) - For high intensity needs
    bassUltra.set(state.bass * 2.5);
    midUltra.set(state.mid * 2.5);
    trebleUltra.set(state.treble * 2.5);

    bpm.set(state.bpm || 0);
  });

  return { 
    bass, mid, treble, 
    bassSubtle,
    bassBoost, midBoost, trebleBoost,
    bassUltra, midUltra, trebleUltra,
    bpm 
  };
}
