'use client';
import React, { useRef, useState } from 'react';
import { Playlist, Track } from '@/types';
import styles from './Player.module.css';

// import PlayIcon from '../../public/icons/play.svg'
// import PauseIcon from '../../public/icons/pause.svg'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DownloadIcon from '../../public/icons/download.svg'
import NextIcon from '../../public/icons/next.svg'
import PrevIcon from '../../public/icons/previous.svg'
import QueueDrawer from './QueueDrawer';
import cn from 'classnames'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../Button/Button';
import MoreIcon from '../../public/icons/more.svg'
import LyricsDrawer from './LyricsDrawer';
import ImageLightbox from '../imageLightbox/ImageLightbox';


interface PlayerControlsProps {
  currentTrack: Track | null;
  nextTrack: Track | null;
  prevTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  onPlayPause: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seek: number) => void;
  isDragging: boolean; // Добавлено для стилизации
  isQueueDrawerOpen: boolean;
  setIsQueueDrawerOpen: (isOpen: boolean) => void;
  isLyricsDrawerOpen: boolean;
  setIsLyricsDrawerOpen: (isOpen: boolean) => void;
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  playlistIsPlaying: Playlist | null;
  togglePlay: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentTrack,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  playing,
  duration,
  seek,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onSeek,
  isDragging,
  isQueueDrawerOpen,
  setIsQueueDrawerOpen,
  isLyricsDrawerOpen,
  setIsLyricsDrawerOpen,
  tracks,
  onTrackSelect,
  playlistIsPlaying,
  togglePlay
}) => {

    const formatTime = (seconds: number) => (
      <NumberFlowGroup>
        <div
          style={{ fontVariantNumeric: 'tabular-nums', '--number-flow-char-height': '0.85em'} as React.CSSProperties}
          className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
        >
          <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
          <NumberFlow
            prefix=":"
            trend={1}
            value={Math.floor(seconds % 60)}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
            transformTiming={{ duration: 370}}
          />
        </div>
      </NumberFlowGroup>
    );

    const progressRef = useRef<HTMLDivElement>(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(seek);

    // Сброс seekValue при обновлении seek
    React.useEffect(() => {
      if (!isSeeking) setSeekValue(seek);
    }, [seek, isSeeking]);

    const handleSeekStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      setIsSeeking(true);
      handleSeekMove(e);
      window.addEventListener("mousemove", handleSeekMoveWin as EventListener);
      window.addEventListener("mouseup", handleSeekEndWin as EventListener);
      window.addEventListener("touchmove", handleSeekMoveWin as EventListener);
      window.addEventListener("touchend", handleSeekEndWin as EventListener);
    };

    // Для window-событий нужны отдельные функции, чтобы типы совпадали
    const handleSeekMoveWin = (e: Event) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        handleSeekMove(e);
      }
    };
    const handleSeekEndWin = (e: Event) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        handleSeekEnd(e);
      }
    };

    const handleSeekMove = (
      e: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      let clientX: number | undefined;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else if ("clientX" in e) {
        clientX = e.clientX;
      }
      if (!progressRef.current || typeof clientX !== "number") return;
      const rect = progressRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newSeek = (x / rect.width) * duration;
      setSeekValue(newSeek);
    };

    const handleSeekEnd = (e: MouseEvent | TouchEvent) => {
      setIsSeeking(false);
      let clientX: number | undefined;
      if ("changedTouches" in e) {
        clientX = e.changedTouches[0].clientX;
      } else if ("clientX" in e) {
        clientX = e.clientX;
      }
      let finalSeek = seekValue;
      if (progressRef.current && typeof clientX === "number") {
        const rect = progressRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        finalSeek = (x / rect.width) * duration;
        setSeekValue(finalSeek);
      }
      window.removeEventListener("mousemove", handleSeekMoveWin as EventListener);
      window.removeEventListener("mouseup", handleSeekEndWin as EventListener);
      window.removeEventListener("touchmove", handleSeekMoveWin as EventListener);
      window.removeEventListener("touchend", handleSeekEndWin as EventListener);
      onSeek(finalSeek);
    };

  return (
    <div className={styles.playerControls}>
      {currentTrack && (
        <>
          <button onClick={onPlayPause} className={cn(styles.play_button, 
          {
            [styles.pauseIcon]: playing == true,
            [styles.playIcon]: playing == false,

          })} >
           
            <span className="material-symbols-outlined">
              {//playing ? <PauseIcon/> : <PlayIcon/>
               }
            </span>
          </button>
 
          <button onClick={onPrevTrack} className={styles.prev_button}>
            <span className="material-symbols-outlined"><PrevIcon/></span>

          </button>

          <button onClick={onNextTrack} className={styles.next_button}>
            <span className="material-symbols-outlined"><NextIcon/></span>
          </button>

          <div className={styles.playerInfo}>
            <ImageLightbox
              src={currentTrack.cover}
              alt={currentTrack.title}
              width={40}
              height={40}
              className="rounded-[8px]"
            />
            <div className={styles.trackInfo}>
              <div className={cn(styles.trackTitle, styles.trackText)}>
              <span>{currentTrack.title}</span>
                <div className={styles.marquee} aria-hidden="true">
                    <div className={styles.marquee__inner}>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                    </div>
                </div>
                </div>
              <div className={cn(styles.trackArtist, styles.trackText)}>
              <span>{currentTrack.artist}</span>
              <div className={styles.marquee} aria-hidden="true">
              <div className={styles.marquee__inner}>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                    </div>
                </div>
                </div>
            </div>
         
          </div>
          <div className={styles.other_controls}>
          <DropdownMenu>
      <DropdownMenuTrigger>
        <Button view='ghost'><MoreIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-[25px] p-2 gap-2">
      <DropdownMenuItem>
      <a
              href={currentTrack.fullSrc}
              download={currentTrack.title + '.mp3'}
              className={styles.downloadButton}
              onClick={(e) => e.stopPropagation()}
            >

              <span className="material-symbols-outlined"><DownloadIcon/></span> скачать трек

            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LyricsDrawer
        isDrawerOpen={isLyricsDrawerOpen}
        setIsDrawerOpen={setIsLyricsDrawerOpen}
        currentTrack={currentTrack}
        duration={duration}
        seek={seek}
        onSeek={onSeek}
        togglePlay={togglePlay}
      />
      <QueueDrawer
        isDrawerOpen={isQueueDrawerOpen}
        setIsDrawerOpen={setIsQueueDrawerOpen}
        tracks={tracks}
        currentTrack={currentTrack}
        onTrackSelect={onTrackSelect}
        playlist={playlistIsPlaying}
      />
          </div>




          <div className={styles.progressBlock}>
            <span className={styles.currentTime}>{formatTime(isSeeking ? seekValue : seek)}</span>
            <div
              className={styles.playerProgress}
              onMouseDown={handleSeekStart}
              onTouchStart={handleSeekStart}
              ref={progressRef}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.progressBarContainer}>
                <div
                  className={`${styles.progressBar} ${isDragging ? styles.dragging : ''}`}
                  style={{ width: `${duration > 0 ? ((isSeeking ? seekValue : seek) / duration) * 100 : 0}%` }}
                />
                <div
                  className={styles.progressThumb}
                  style={{
                    left: `${duration > 0 ? ((isSeeking ? seekValue : seek) / duration) * 100 : 0}%`,
                    transition: isSeeking ? "none" : undefined,
                  }}
                />
              </div>
            </div>
            <span className={styles.duration}>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerControls;