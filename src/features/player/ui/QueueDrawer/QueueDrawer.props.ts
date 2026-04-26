import { Playlist, Track } from '@/types';
import { QueueItem } from '../../store/playerStore';

export interface QueueDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  tracks: QueueItem[];
  currentTrack: QueueItem | null;
  onTrackSelect: (track: Track) => void;
  playlist: Playlist | null;
  scrollToMode?: 'start' | 'center';
  showPrevious?: boolean;
}
