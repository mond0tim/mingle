"use client";

import React, { useState } from 'react';
import { Track } from '@/types';
import styles from './TrackItem.module.css';
import Image from 'next/image';
import { LikeButton } from '../LikeButton/LikeButton';
import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Drawer } from 'vaul';
import { useMediaQuery } from 'react-responsive';
import { TrackActionsContent } from './TrackActions';
import { useLongPress } from '@/shared/hooks/useLongPress';
import { DragIcon } from '@/shared/ui/icons';
import { TrackActionsDrawer } from './TrackActionsDrawer';

interface TrackItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
  isPlaying: boolean;
  maxWidth?: string;
  spanWidth?: string;
  trackNumber?: number;
  pinned?: boolean;
  onRemove?: (trackId: string | number) => void;
  context?: 'queue' | 'playlist' | 'history';
  className?: string;
  containerClassName?: string;
  activeColor?: string;
  hoverColor?: string;
  dragControls?: any;
}

const TrackItem: React.FC<TrackItemProps> = React.memo(({
  track,
  onTrackSelect,
  isPlaying,
  maxWidth = "100%",
  spanWidth = "100%",
  trackNumber,
  pinned,
  onRemove,
  context,
  className,
  containerClassName,
  activeColor,
  hoverColor,
  dragControls,
}) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 640px)' });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTrackSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackSelect(track);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) onRemove(track.id);
  };

  const longPressProps = useLongPress(
    () => {
      if (!isDesktop) setIsDrawerOpen(true);
    },
    (e) => {
      handleTrackSelect(e);
    },
    { delay: 400 }
  );

  const menuContent = (
    <TrackActionsContent
      track={track}
      context={context}
      onRemove={onRemove}
      closeMenu={() => setIsDrawerOpen(false)}
    />
  );

  return (
    <>
      <div
        className={cn(styles.trackItemContainer, containerClassName, pinned && styles.pinned)}
        style={{
          '--track-active-bg': isPlaying ? 'var(--dominant-color)' : activeColor,
          '--track-hover-bg': hoverColor,
        } as React.CSSProperties}
      >
        <ContextMenu>
          <ContextMenuTrigger disabled={!isDesktop} asChild>
            <motion.div
              {...(isDesktop ? { onClick: handleTrackSelect } : {
                onPointerDown: longPressProps.onPointerDown,
                onPointerUp: longPressProps.onPointerUp,
                onPointerMove: longPressProps.onPointerMove,
                onPointerLeave: longPressProps.onPointerLeave,
                onTouchEnd: longPressProps.onTouchEnd,
              })}
              whileTap={{ scale: 0.98 }}
              className={cn(
                styles.trackItem,
                isPlaying && styles.playing,
                trackNumber && styles.numbered,
                context === 'queue' && styles.inQueue,
                className
              )}
              style={{ '--trackItemMaxWidth': maxWidth, '--trackItemSpanWidth': spanWidth } as React.CSSProperties}
            >
              {trackNumber && (
                <span className={styles.trackNumber}>{trackNumber}</span>
              )}

              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={track.cover || "/placeholder.png"}
                  alt={track.title || "Track Cover"}
                  fill
                  sizes="48px"
                  className='rounded-lg object-cover'
                />
              </div>

              <div className={styles.trackInfoWrapper}>
                <div className={cn(styles.trackTitle, isPlaying && styles.playing)}>
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

              {context === 'queue' && (
                <div className={styles.queueActions} onClick={e => e.stopPropagation()}>
                  {!isPlaying && (
                    <button
                      onClick={handleRemove}
                      className={`${styles.removeButton} size-5`}
                      title="Удалить"
                    >
                      <X size={14} />
                    </button>
                  )}
                  {dragControls && (
                    <div
                      className={styles.dragHandle}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        dragControls.start(e);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ touchAction: 'none' }}
                    >
                      <DragIcon size={14} />
                    </div>
                  )}
                </div>
              )}

              {context !== 'queue' && (
                <div className={styles.actions} onClick={e => e.stopPropagation()}>
                  <LikeButton trackId={track.id} size={18} />
                  <div className="md:block hidden">
                    <Plus size={16} className="opacity-40" />
                  </div>
                </div>
              )}
            </motion.div>
          </ContextMenuTrigger>
          {isDesktop && (
            <ContextMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-white/10 text-white p-1 z-[9999]">
              {menuContent}
            </ContextMenuContent>
          )}
        </ContextMenu>
      </div>

      <TrackActionsDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        track={track}
        context={context}
        onRemove={onRemove}
      />
    </>
  );
}, (prev, next) => {
  return prev.track.id === next.track.id &&
    prev.isPlaying === next.isPlaying &&
    prev.pinned === next.pinned &&
    prev.context === next.context &&
    prev.activeColor === next.activeColor;
});

export default TrackItem;
