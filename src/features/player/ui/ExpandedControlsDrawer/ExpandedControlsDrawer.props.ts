import type { Playlist, Track } from "@/types"
import { QueueItem } from "../../store/playerStore"

export interface ExpandedControlsDrawerProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
  currentTrack: QueueItem
  prevTrack: QueueItem | null
  nextTrack: QueueItem | null
  playing: boolean
  onPlayPause: () => void
  onSeek: (seek: number) => void
  onNextTrack: () => void
  onPrevTrack: () => void
  tracks: QueueItem[]
  onTrackSelect: (track: Track) => void
  playlistIsPlaying: Playlist | null
}
