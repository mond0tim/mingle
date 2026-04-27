"use client";

import React from 'react';
import { DownloadIcon } from '@/shared/ui/icons';
import { X, ListPlus, PlayCircle } from 'lucide-react';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { Track } from '@/types';
import { LikeButton } from '../LikeButton/LikeButton';

interface TrackActionsProps {
  track: Track;
  context?: 'queue' | 'playlist' | 'history';
  onRemove?: (trackId: string | number) => void;
  closeMenu?: () => void;
}

export const TrackActionsContent: React.FC<TrackActionsProps> = ({
  track,
  context,
  onRemove,
  closeMenu,
}) => {
  const addTrackToQueue = usePlayerStore(state => state.addTrackToQueue);
  const addTrackNext = usePlayerStore(state => state.addTrackNext);

  const handleAction = (action: () => void) => {
    action();
    closeMenu?.();
  };

  return (
    <div className="flex flex-col gap-0.5 min-w-[200px]">
      <div className="mb-1 border-b border-white/5 pb-1">
        <LikeButton 
          trackId={track.id} 
          showText 
          className="w-full flex items-center gap-3 px-3 py-3 text-sm hover:bg-white/10 rounded-md transition-colors text-left font-medium"
        />
      </div>

      {context !== 'queue' && (
        <>
          <button
            onClick={() => handleAction(() => addTrackNext(track))}
            className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-white/10 rounded-md transition-colors text-left"
          >
            <PlayCircle size={18} className="opacity-70" />
            <span>Играть далее</span>
          </button>
          <button
            onClick={() => handleAction(() => addTrackToQueue(track))}
            className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-white/10 rounded-md transition-colors text-left"
          >
            <ListPlus size={18} className="opacity-70" />
            <span>В очередь</span>
          </button>
        </>
      )}

      <a
        href={track.fullSrc || undefined}
        download={track.title + '.mp3'}
        onClick={() => closeMenu?.()}
        className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-white/10 rounded-md transition-colors text-left"
      >
        <DownloadIcon className="w-[18px] h-[18px] opacity-70" />
        <span>Скачать</span>
      </a>

      {onRemove && (
        <button
          onClick={() => handleAction(() => onRemove(track.id))}
          className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-red-500/10 text-red-400 rounded-md transition-colors text-left mt-1 border-t border-white/5"
        >
          <X size={18} />
          <span>Удалить</span>
        </button>
      )}
    </div>
  );
};
