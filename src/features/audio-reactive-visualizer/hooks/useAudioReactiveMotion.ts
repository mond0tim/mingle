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

    // Boosted (x2)
    bassBoost.set(state.bass * 2);
    midBoost.set(state.mid * 2);
    trebleBoost.set(state.treble * 2);

    // Ultra (x4)
    bassUltra.set(state.bass * 4);
    midUltra.set(state.mid * 4);
    trebleUltra.set(state.treble * 4);

    bpm.set(state.bpm || 0);
  });

  return { 
    bass, mid, treble, 
    bassBoost, midBoost, trebleBoost,
    bassUltra, midUltra, trebleUltra,
    bpm 
  };
}
