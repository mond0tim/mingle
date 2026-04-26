import { Playlist, Track } from '@/types';
import { QueueItem } from '../../store/playerStore';

export interface PlayerControlsProps {
  currentTrack: QueueItem | null;
  nextTrack: QueueItem | null;
  prevTrack: QueueItem | null;
  playing: boolean;
  onPlayPause: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seek: number) => void;
  isDragging: boolean; 
  isQueueDrawerOpen: boolean;
  setIsQueueDrawerOpen: (isOpen: boolean) => void;
  isLyricsDrawerOpen: boolean;
  setIsLyricsDrawerOpen: (isOpen: boolean) => void;
  tracks: QueueItem[];
  onTrackSelect: (track: Track) => void;
  playlistIsPlaying: Playlist | null;
  togglePlay: () => void;
}
