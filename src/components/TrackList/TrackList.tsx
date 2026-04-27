import React, { useState, useEffect } from 'react';
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

const TRACKS_PER_PAGE = 20;

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onTrackSelect,
  currentTrack,
  trackItemMaxWidth,
  trackItemSpanWidth,
  numbered = false,
  pinned = false,
}) => {
  const [displayCount, setDisplayCount] = useState(TRACKS_PER_PAGE);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        setDisplayCount(prev => Math.min(prev + TRACKS_PER_PAGE, tracks.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tracks.length]);

  // Reset display count when tracks change (e.g. navigation between playlists)
  useEffect(() => {
    setDisplayCount(TRACKS_PER_PAGE);
  }, [tracks]);

  const visibleTracks = tracks.slice(0, displayCount);

  return (
    <div className={styles.trackList}>
      {visibleTracks.map((track, index) => (
        <TrackItem
          key={`${track.id}-${index}`}
          track={track}
          onTrackSelect={onTrackSelect}
          isPlaying={('queueId' in track && track.queueId && currentTrack && 'queueId' in currentTrack && currentTrack.queueId) ? currentTrack.queueId === track.queueId : currentTrack?.id === track.id}
          maxWidth={trackItemMaxWidth || '8rem'}
          spanWidth={trackItemSpanWidth || 'var(--trackItemMaxWidth)'}
          trackNumber={numbered ? index + 1 : undefined}
          pinned={pinned}
        />
      ))}
      {displayCount < tracks.length && (
        <div className="p-4 text-center text-zinc-500 animate-pulse font-medium">
          Загрузка остальных треков...
        </div>
      )}
    </div>
  );
};

export default TrackList;
