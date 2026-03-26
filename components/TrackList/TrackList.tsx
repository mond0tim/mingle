import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import { Track } from '@/types';
import styles from './TrackList.module.css';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  currentTrack: Track | null;
  trackItemMaxWidth?: string;
  trackItemSpanWidth?: string;
  numbered?: boolean;
  pinned?:boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onTrackSelect,
  currentTrack,
  trackItemMaxWidth,
  trackItemSpanWidth,
  numbered = false,
  pinned = false,
}) => {
  return (
    <div className={styles.trackList}>
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          onTrackSelect={onTrackSelect}
          isPlaying={currentTrack?.id === track.id}
          maxWidth={trackItemMaxWidth || '8rem'}
          spanWidth={trackItemSpanWidth || 'var(--trackItemMaxWidth)'}
          // Передаём номер трека, только если numbered === true
          trackNumber={numbered ? index + 1 : undefined}
          pinned={pinned}
        />
      ))}
    </div>
  );
};

export default TrackList;
