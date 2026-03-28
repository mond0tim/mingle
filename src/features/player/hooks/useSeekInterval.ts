import { useEffect } from 'react';
import { usePlayerStore } from '../store/playerStore';

/**
 * Polls Howler for the current seek position every 100ms while playing.
 * This replicates the interval logic that existed in the old PlayerContext,
 * which was accidentally dropped during the Zustand migration.
 */
export const useSeekInterval = () => {
  const playing = usePlayerStore((state) => state.playing);
  const howlerRef = usePlayerStore((state) => state.howlerRef);
  const setSeek = usePlayerStore((state) => state.setSeek);
  const setDuration = usePlayerStore((state) => state.setDuration);

  useEffect(() => {
    if (!playing) return;

    const intervalId = setInterval(() => {
      if (!howlerRef?.current) return;

      const currentSeek = howlerRef.current.seek() as number;
      if (!isNaN(currentSeek)) {
        setSeek(currentSeek);
      }

      // Also keep duration fresh (it can change on load)
      const currentDuration = howlerRef.current.duration();
      if (!isNaN(currentDuration) && currentDuration > 0) {
        setDuration(currentDuration);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [playing, howlerRef, setSeek, setDuration]);
};
