import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const idleBands = { bass: 0, mid: 0, treble: 0 };

const idleReactive = {
  bpm: null as number | null,
  bpmStatus: 'Нет источника',
  ...idleBands,
};

export interface AudioReactiveSnapshot {
  sessionDepth: number;
  bpm: number | null;
  bpmStatus: string;
  bass: number;
  mid: number;
  treble: number;
}

interface AudioReactiveState extends AudioReactiveSnapshot {
  acquireSession: () => void;
  releaseSession: () => void;
  setBpm: (bpm: number | null) => void;
  setBpmStatus: (status: string) => void;
  setBands: (bands: typeof idleBands) => void;
}

export const useAudioReactiveStore = create<AudioReactiveState>((set, get) => ({
  sessionDepth: 0,
  ...idleReactive,

  acquireSession: () => set((s) => ({ sessionDepth: s.sessionDepth + 1 })),

  releaseSession: () => {
    const depth = get().sessionDepth - 1;
    if (depth <= 0) {
      set({ sessionDepth: 0, ...idleReactive });
    } else {
      set({ sessionDepth: depth });
    }
  },

  setBpm: (bpm) => set({ bpm }),

  setBpmStatus: (bpmStatus) => set({ bpmStatus }),

  setBands: (bands) => {
    const { bass, mid, treble } = get();
    if (
      Math.abs(bass - bands.bass) < 0.002 &&
      Math.abs(mid - bands.mid) < 0.002 &&
      Math.abs(treble - bands.treble) < 0.002
    ) {
      return;
    }
    set(bands);
  },
}));

export function useAudioReactiveSnapshot() {
  return useAudioReactiveStore(
    useShallow((s) => ({
      sessionDepth: s.sessionDepth,
      bpm: s.bpm,
      bpmStatus: s.bpmStatus,
      bass: s.bass,
      mid: s.mid,
      treble: s.treble,
    })),
  );
}
