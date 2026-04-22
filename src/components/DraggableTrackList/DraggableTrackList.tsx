"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import TrackItem from '../TrackItem/TrackItem';
import { Track } from '@/types';
import styles from './DraggableTrackList.module.css';
import { GripVertical } from 'lucide-react';
import { usePlayerStore } from '@/features/player/store/playerStore';

interface DraggableTrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onRemove: (id: string) => void;
  currentTrack: Track | null;
}

const TrackReorderItem: React.FC<any> = React.memo(({ track, onTrackSelect, onRemove, currentTrack, qId, onDragStart, onDragEnd }) => {
  const controls = useDragControls();
  
  return (
    <Reorder.Item 
      value={track} 
      id={qId}
      dragListener={false} 
      dragControls={controls}
      className={styles.draggableItem}
      data-vaul-no-drag="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      data-active={currentTrack?.id === track.id}
      data-playing={('queueId' in track && track.queueId && currentTrack && 'queueId' in currentTrack && currentTrack.queueId) ? currentTrack.queueId === track.queueId : currentTrack?.id === track.id}
    >
      <div className={styles.innerCard} data-vaul-no-drag="true">
        <div 
          className={styles.dragHandle} 
          data-vaul-no-drag="true"
          onPointerDown={(e) => controls.start(e)}
          style={{ touchAction: 'none' }}
        >
          <GripVertical size={18} />
        </div>
        <div style={{ flex: 1, width: '100%' }} data-vaul-no-drag="true">
            <TrackItem
              track={track}
              onTrackSelect={onTrackSelect}
              isPlaying={('queueId' in track && track.queueId && currentTrack && 'queueId' in currentTrack && currentTrack.queueId) ? currentTrack.queueId === track.queueId : currentTrack?.id === track.id}
              maxWidth="100%"
              spanWidth="100%"
              onRemove={() => onRemove(qId)}
              context="queue"
            />
        </div>
      </div>
    </Reorder.Item>
  );
}, (prev, next) => {
  // Custom comparator for pure performance
  return prev.qId === next.qId && 
         prev.currentTrack?.id === next.currentTrack?.id && 
         prev.track === next.track;
});

export const DraggableTrackList: React.FC<DraggableTrackListProps> = ({
  tracks,
  onTrackSelect,
  onRemove,
  currentTrack,
}) => {
  const [mounted, setMounted] = useState(false);
  const [localTracks, setLocalTracks] = useState(tracks);
  const localTracksRef = useRef(tracks);
  const setTracks = usePlayerStore(state => state.setTracks);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync to local tracks when external global tracks change
  useEffect(() => {
    setLocalTracks(tracks);
    localTracksRef.current = tracks;
  }, [tracks]);

  const handleReorder = (newOrder: any[]) => {
    setLocalTracks(newOrder);
    localTracksRef.current = newOrder;
  };

  const handleDragEnd = () => {
    // Sync to global store only ONCE when drag ends
    setTracks(localTracksRef.current);
  };

  if (!mounted) return null;

  return (
    <Reorder.Group 
      axis="y" 
      values={localTracks} 
      onReorder={handleReorder}
      className={styles.list}
      data-vaul-no-drag="true"
    >
      {localTracks.map((track: any) => {
        const qId = track.queueId || String(track.id);
        return (
          <TrackReorderItem
            key={qId}
            qId={qId}
            track={track}
            onTrackSelect={onTrackSelect}
            onRemove={onRemove}
            currentTrack={currentTrack}
            onDragStart={() => {}}
            onDragEnd={handleDragEnd}
          />
        );
      })}
    </Reorder.Group>
  );
};
