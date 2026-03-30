import { useEffect } from 'react';
import { usePlayerStore } from '../store/playerStore';

/**
 * Polls Howler for the current seek position every 100ms while playing.
 * This replicates the interval logic that existed in the old PlayerContext,
 * which was accidentally dropped during the Zustand migration.
 */
export const useSeekInterval = () => {
  const playing = usePlayerStore((state) => state.playing);
  const howlerInstance = usePlayerStore((state) => state.howlerInstance);
  const setSeek = usePlayerStore((state) => state.setSeek);
  const setDuration = usePlayerStore((state) => state.setDuration);

  useEffect(() => {
    if (!playing) return;

    const intervalId = setInterval(() => {
      const state = usePlayerStore.getState();
      const inst = state.howlerInstance;
      if (!inst || state.isGlobalSeeking) return;

      const currentSeek = inst.seek() as number;
      if (!isNaN(currentSeek)) {
        setSeek(currentSeek);
      }

      // Also keep duration fresh (it can change on load)
      const currentDuration = inst.duration();
      if (!isNaN(currentDuration) && currentDuration > 0) {
        setDuration(currentDuration);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [playing, howlerInstance, setSeek, setDuration]);
};
