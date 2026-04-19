import React, { useRef, useState } from 'react';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { usePlayerStore } from '../../store/playerStore';
import { Button } from '@/components/Button/Button';
import ImageLightbox from '@/components/imageLightbox/ImageLightbox';
import cn from 'classnames';
import { PrevIcon, NextIcon, MoreIcon } from '@/shared/ui/icons';
import { LikeButton } from '@/components/LikeButton/LikeButton';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { TextMorph } from 'torph/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { DownloadIcon } from '@/shared/ui/icons';
import LyricsDrawer from '../LyricsDrawer';
import QueueDrawer from '../QueueDrawer';
import { PlayerControlsProps } from './PlayerControls.props';
import { PlaybackButtons } from '../PlaybackButtons/PlaybackButtons';
import styles from './PlayerControls.module.css'

const CurrentTime: React.FC<{ isSeeking: boolean; seekValue: number }> = ({ isSeeking, seekValue }) => {
  const seek = usePlayerStore((state) => state.seek);

  const formatTime = (seconds: number) => (
    <NumberFlowGroup>
      <div
        style={{ fontVariantNumeric: 'tabular-nums', '--number-flow-char-height': '0.85em' } as React.CSSProperties}
        className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
      >
        <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
        <NumberFlow
          prefix=":"
          trend={1}
          value={Math.floor(seconds % 60)}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          transformTiming={{ duration: 370 }}
        />
      </div>
    </NumberFlowGroup>
  );

  return <span className={styles.currentTime}>{formatTime(isSeeking ? seekValue : seek)}</span>;
};

const DurationTime: React.FC = () => {
  const duration = usePlayerStore((state) => state.duration);

  const formatTime = (seconds: number) => (
    <NumberFlowGroup>
      <div
        style={{ fontVariantNumeric: 'tabular-nums', '--number-flow-char-height': '0.85em' } as React.CSSProperties}
        className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
      >
        <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
        <NumberFlow
          prefix=":"
          trend={1}
          value={Math.floor(seconds % 60)}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          transformTiming={{ duration: 370 }}
        />
      </div>
    </NumberFlowGroup>
  );

  return <span className={styles.duration}>{formatTime(duration)}</span>;
};

const PlayerProgressBar: React.FC<{
  isSeeking: boolean;
  seekValue: number;
  onSeekStart: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  progressRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
}> = ({ isSeeking, seekValue, onSeekStart, progressRef, isDragging }) => {
  const seek = usePlayerStore((state) => state.seek);
  const duration = usePlayerStore((state) => state.duration);

  const currentPos = isSeeking ? seekValue : seek;
  const progress = duration > 0 ? (currentPos / duration) * 100 : 0;

  return (
    <div
      className={styles.playerProgress}
      onMouseDown={onSeekStart}
      onTouchStart={onSeekStart}
      ref={progressRef}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.progressBarContainer}>
        <div
          className={`${styles.progressBar} ${isDragging ? styles.dragging : ''}`}
          style={{ width: `${progress}%` }}
        />
        <div
          className={styles.progressThumb}
          style={{
            left: `${progress}%`,
            transition: isSeeking ? "none" : undefined,
          }}
        />
      </div>
    </div>
  );
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentTrack,
  playing,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onSeek,
  isDragging: isDraggingProp,
  isQueueDrawerOpen,
  setIsQueueDrawerOpen,
  isLyricsDrawerOpen,
  setIsLyricsDrawerOpen,
  tracks,
  onTrackSelect,
  playlistIsPlaying,
  togglePlay
}) => {
  const duration = usePlayerStore(state => state.duration);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    handleSeekMove(e);
    window.addEventListener("mousemove", handleSeekMoveWin as EventListener);
    window.addEventListener("mouseup", handleSeekEndWin as EventListener);
    window.addEventListener("touchmove", handleSeekMoveWin as EventListener);
    window.addEventListener("touchend", handleSeekEndWin as EventListener);
  };

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
          <PlaybackButtons
            isPlaying={playing}
            onPlayPause={onPlayPause}
            onPrev={onPrevTrack}
            onNext={onNextTrack}
            className={styles.playback_container}
          />

          <div className={styles.playerInfo}>
            <ImageLightbox
              src={currentTrack.cover || "/placeholder.png"}
              alt={currentTrack.title || "Track Cover"}
              width={40}
              height={40}
              className="rounded-[8px]"
            />
            <div className={styles.trackInfo}>
              <div className={styles.trackTitleContainer}>
                <div className={cn(styles.trackTitle, styles.trackText)}>
                  
                <TextMorph>{currentTrack.title}</TextMorph>
                  <div className={styles.marquee} aria-hidden="true">
                    <div className={styles.marquee__inner}>
                      <span>{currentTrack.title}</span>
                      <span>{currentTrack.title}</span>
                      <span>{currentTrack.title}</span>
                      <span>{currentTrack.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <LikeButton trackId={currentTrack.id} size={16} />
                </div>
              </div>
              <div className={cn(styles.trackArtist, styles.trackText)}>
              <TextMorph>{currentTrack.artist}</TextMorph>
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
            <VolumeSlider />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button view='ghost'><MoreIcon /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-[25px] p-2 gap-2">
                <DropdownMenuItem>
                  <a
                    href={currentTrack.fullSrc || undefined}
                    download={currentTrack.title + '.mp3'}
                    className={styles.downloadButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="material-symbols-outlined"><DownloadIcon /></span> скачать трек
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LyricsDrawer
              isDrawerOpen={isLyricsDrawerOpen}
              setIsDrawerOpen={setIsLyricsDrawerOpen}
              currentTrack={currentTrack}
              togglePlay={togglePlay}
              isPlaying={playing}
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
            <CurrentTime isSeeking={isSeeking} seekValue={seekValue} />
            <PlayerProgressBar
              isSeeking={isSeeking}
              seekValue={seekValue}
              onSeekStart={handleSeekStart}
              progressRef={progressRef}
              isDragging={isDraggingProp}
            />
            <DurationTime />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerControls;