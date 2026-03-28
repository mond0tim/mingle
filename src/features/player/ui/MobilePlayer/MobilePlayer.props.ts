import type { Playlist, Track } from "@/types"
import type ReactHowler from "react-howler"
import { RefObject } from "react"

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
  howlerRef: RefObject<ReactHowler>
  playlistIsPlaying: Playlist | null
}
