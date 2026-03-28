import { Track } from '@/types';

export interface LyricsDrawerProps {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isOpen: boolean) => void;
  currentTrack: Track | null;
  togglePlay: () => void;
  isPlaying?: boolean;
}
