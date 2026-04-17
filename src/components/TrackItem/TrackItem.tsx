"use client";

import React from 'react';
import { Track } from '@/types';
import styles from './TrackItem.module.css';
import Image from 'next/image';
import { DownloadIcon, MoreIcon } from '@/shared/ui/icons';
import { Button } from '../Button/Button';
import { LikeButton } from '../LikeButton/LikeButton';
import { X, ListPlus, PlayCircle } from 'lucide-react';
import { usePlayerStore } from '@/features/player/store/playerStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TrackItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
  isPlaying: boolean;
  maxWidth: string;
  spanWidth: string;
  trackNumber?: number;
  pinned?: boolean;
  onRemove?: (trackId: string | number) => void;
  context?: 'queue' | 'playlist' | 'history';
}

const TrackItem: React.FC<TrackItemProps> = React.memo(({
  track,
  onTrackSelect,
  isPlaying,
  maxWidth,
  spanWidth,
  trackNumber,
  pinned,
  onRemove,
  context,
}) => {
  const addTrackToQueue = usePlayerStore(state => state.addTrackToQueue);
  const addTrackNext = usePlayerStore(state => state.addTrackNext);

  const handleTrackClick = () => {
    onTrackSelect(track);
  };

  return (
    <div className={styles.trackItemContainer}>
      <Button
        view='ghost'
        ButtonRadius='sm'
        className={`${styles.trackItem} ${isPlaying ? styles.playing : ''} ${trackNumber ? styles.numbered : ''} ${isPlaying && pinned ? styles.pinned : ''}`}
        onClick={handleTrackClick}
        style={{ '--trackItemMaxWidth': maxWidth, '--trackItemSpanWidth': spanWidth } as React.CSSProperties}
      >
        {trackNumber && (
          <span className={styles.trackNumber}>{trackNumber}</span>
        )}
        <Image
          src={track.cover || "/placeholder.png"}
          alt={track.title || "Track Cover"}
          width={50}
          height={50}
          className='rounded-[9px]'
        />
        <div className={styles.trackInfoWrapper}>
          <div className={`${styles.trackTitle} ${isPlaying ? styles.playing : ''}`}>
            {isPlaying ? (
              <>
                <span className='opacity-0'>{track.title}</span>
                <div className={styles.marquee} aria-hidden="true">
                  <div className={styles.marquee__inner}>
                    <span>{track.title}</span>
                    <span>{track.title}</span>
                    <span>{track.title}</span>
                    <span>{track.title}</span>
                  </div>
                </div>
              </>
            ) : (
              <>{track.title}</>
            )}
          </div>
          <div className={styles.trackArtist}>{track.artist || "Unknown Artist"}</div>
        </div>
      </Button>

      <div className={styles.actions}>
        {context !== 'queue' && <LikeButton trackId={track.id} size={18} />}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button view="ghost" className="opacity-60 hover:opacity-100">
              <MoreIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/80 backdrop-blur-xl border-white/10 text-white">
            {context !== 'queue' && (
              <>
                <DropdownMenuItem
                  onClick={(e) => { e.stopPropagation(); addTrackNext(track); }}
                  className="gap-2 cursor-pointer hover:bg-white/10"
                >
                  <PlayCircle size={16} />
                  <span>Играть далее</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => { e.stopPropagation(); addTrackToQueue(track); }}
                  className="gap-2 cursor-pointer hover:bg-white/10"
                >
                  <ListPlus size={16} />
                  <span>Добавить в очередь</span>
                </DropdownMenuItem>
              </>
            )}

            {context === 'queue' && (
              <DropdownMenuItem asChild className="p-0 border-none cursor-pointer hover:bg-white/10">
                <LikeButton trackId={track.id} size={16} className="w-full flex justify-start rounded p-2 gap-2 font-normal text-sm opacity-100 hover:opacity-100 h-auto">
                  <span>Нравится</span>
                </LikeButton>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild className="gap-2 cursor-pointer hover:bg-white/10">
              <a
                href={track.fullSrc || undefined}
                download={track.title + '.mp3'}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center w-full"
              >
                <DownloadIcon />
                <span className="ml-2">Скачать</span>
              </a>
            </DropdownMenuItem>

            {onRemove && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(track.id);
                }}
                className="gap-2 cursor-pointer hover:bg-red-500/20 text-red-400"
              >
                <X size={16} />
                <span>Удалить из очереди</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.track.id === next.track.id &&
    prev.isPlaying === next.isPlaying &&
    prev.pinned === next.pinned &&
    prev.context === next.context;
});

export default TrackItem;
