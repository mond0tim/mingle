import React from 'react';
import { Track } from '@/types';
import styles from './TrackItem.module.css';
import Image from 'next/image';
import { DownloadIcon } from '@/shared/ui/icons';
import { Button } from '../Button/Button';

interface TrackItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
  isPlaying: boolean;
  maxWidth: string;
  spanWidth: string;
  // Новый пропс для номера трека
  trackNumber?: number;
  pinned?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  onTrackSelect,
  isPlaying,
  maxWidth,
  spanWidth,
  trackNumber,
  pinned,
}) => {
  return (
    <Button
      view='ghost'
      ButtonRadius='sm'
      // Если trackNumber присутствует, добавляем класс styles.numbered
      className={`${styles.trackItem} ${isPlaying ? styles.playing : ''} ${trackNumber ? styles.numbered : ''} ${isPlaying && pinned? styles.pinned : ''}`}
      onClick={() => onTrackSelect(track)}
      style={{ '--trackItemMaxWidth': maxWidth, '--trackItemSpanWidth': spanWidth } as React.CSSProperties}
    >
      {/* Если передан номер трека, отображаем его */}
      {trackNumber && (
        <span className={styles.trackNumber}>{trackNumber}</span>
      )}
      <Image
        src={track.cover}
        alt={track.title}
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
        <div className={styles.trackArtist}>{track.artist}</div>
      </div>
      <a
        href={track.fullSrc}
        download={track.title + '.mp3'}
        onClick={(e) => e.stopPropagation()}
        className={styles.trackItem}
      >
        <span className="material-symbols-outlined">
          <DownloadIcon />
        </span>
      </a>
    </Button>
  );
};

export default TrackItem;
