import { Playlist, Track } from '@/types';

export interface QueueDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  playlist: Playlist | null;
}
