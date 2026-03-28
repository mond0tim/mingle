import type { Playlist, Track } from "@/types"

export interface ExpandedControlsDrawerProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
  currentTrack: Track
  prevTrack: Track | null
  nextTrack: Track | null
  playing: boolean
  onPlayPause: () => void
  onSeek: (seek: number) => void
  onNextTrack: () => void
  onPrevTrack: () => void
  tracks: Track[]
  onTrackSelect: (track: Track) => void
  playlistIsPlaying: Playlist | null
}
