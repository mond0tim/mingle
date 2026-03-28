import { Playlist, Track } from '@/types';

export interface PlayerControlsProps {
  currentTrack: Track | null;
  nextTrack: Track | null;
  prevTrack: Track | null;
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
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  playlistIsPlaying: Playlist | null;
  togglePlay: () => void;
}
