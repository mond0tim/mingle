import type { Playlist, Track } from "@/types"

export interface MobilePlayerProps {
  currentTrack: Track | null
  nextTrack: Track | null
  prevTrack: Track | null
  playing: boolean
  onPlayPause: () => void
  onSeek: (seek: number) => void
  onNextTrack: () => void
  onPrevTrack: () => void
  tracks: Track[]
  onTrackSelect: (track: Track) => void
  playlistIsPlaying: Playlist | null
}
