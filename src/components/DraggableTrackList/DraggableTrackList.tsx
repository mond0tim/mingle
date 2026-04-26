"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import TrackItem from '../TrackItem/TrackItem';
import { Track } from '@/types';
import { QueueItem } from '@/features/player/store/playerStore';
import styles from './DraggableTrackList.module.css';
import { usePlayerStore } from '@/features/player/store/playerStore';

interface DraggableTrackListProps {
  tracks: QueueItem[];
  onTrackSelect: (track: Track) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onRemove: (id: string) => void;
  currentTrack: QueueItem | null;
}

const TrackReorderItem: React.FC<any> = React.memo(({ track, onTrackSelect, onRemove, currentTrack, qId, onDragStart, onDragEnd }) => {
  const controls = useDragControls();

  const isPlaying = ('queueId' in track && track.queueId && currentTrack && 'queueId' in currentTrack && currentTrack.queueId) 
    ? currentTrack.queueId === track.queueId 
    : currentTrack?.id === track.id;

  return (
    <Reorder.Item
      value={track}
      id={qId}
      data-queue-id={qId}
      dragListener={false}
      dragControls={controls}
      className={styles.draggableItem}
      data-vaul-no-drag="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <TrackItem
        track={track}
        onTrackSelect={onTrackSelect}
        isPlaying={isPlaying}
        onRemove={() => onRemove(qId)}
        context="queue"
        dragControls={controls}
      />
    </Reorder.Item>
  );
}, (prev, next) => {
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

  useEffect(() => {
    setLocalTracks(tracks);
    localTracksRef.current = tracks;
  }, [tracks]);

  const handleReorder = (newOrder: any[]) => {
    setLocalTracks(newOrder);
    localTracksRef.current = newOrder;
  };

  const handleDragEnd = () => {
    setTracks(localTracksRef.current);
  };

  if (!mounted) return null;

  return (
    <Reorder.Group
      axis="y"
      values={localTracks}
      onReorder={handleReorder}
      className={styles.list}
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
            onDragStart={() => { }}
            onDragEnd={handleDragEnd}
          />
        );
      })}
    </Reorder.Group>
  );
};

