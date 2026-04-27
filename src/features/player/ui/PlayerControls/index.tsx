import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'; // Добавлен MotionConfig
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import { usePlayerStore } from '../../store/playerStore';
import { Button } from '@/components/Button/Button';
import ImageLightbox from '@/components/imageLightbox/ImageLightbox';
import cn from 'classnames';
import { MoreIcon, MicroIcon, QueueIcon, DownloadIcon } from '@/shared/ui/icons';
// Добавлен useCanAnimate из @number-flow/react
import NumberFlow, { NumberFlowGroup, continuous, useCanAnimate } from '@number-flow/react';
import { TextMorph } from 'torph/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import LyricsDrawer from '../LyricsDrawer';
import QueueDrawer from '../QueueDrawer';
import { PlayerControlsProps } from './PlayerControls.props';
import { PlaybackButtons } from '../PlaybackButtons/PlaybackButtons';
import styles from './PlayerControls.module.css';
import { LikeButton } from '@/components/LikeButton/LikeButton';

// 1. Создаем motion-компонент для NumberFlow
const MotionNumberFlow = motion.create(NumberFlow);

// 2. Выносим логику тултипа в отдельный компонент для работы с Framer Motion контекстом
// Обязательно импортируйте useCanAnimate, если еще не сделали:
// import NumberFlow, { NumberFlowGroup, continuous, useCanAnimate } from '@number-flow/react'; 

const TooltipTime: React.FC<{ seconds: number; tooltipX: number }> = ({ seconds, tooltipX }) => {
  const canAnimate = useCanAnimate();

  return (
    <motion.div
      layoutRoot
      style={{
        position: 'absolute',
        left: `${tooltipX}%`,
        bottom: '100%',
        marginBottom: '10px',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <MotionConfig
        transition={{
          layout: canAnimate ? { duration: 0.3, bounce: 0, type: 'spring' } : { duration: 0 }
        }}
      >
        <motion.div
          layout="size"
          initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 5, filter: "blur(3px)" }}
          className={styles.progressTooltip}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            fontVariantNumeric: 'tabular-nums',
            '--number-flow-char-height': '0.85em'
          } as React.CSSProperties}
        >

          <MotionNumberFlow
            trend={1}
            value={Math.floor(seconds / 60)}
            format={{ minimumIntegerDigits: 1 }}
            isolate
            layout="size" // <--- ИЗМЕНИЛИ ЗДЕСЬ (было просто layout)
            layoutRoot
            plugins={[continuous]}
            transformTiming={{
              easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
              duration: 500
            }}
          />
          <MotionNumberFlow
            prefix=":"
            trend={1}
            value={Math.floor(seconds % 60)}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
            isolate
            layout="size" // <--- ИЗМЕНИЛИ ЗДЕСЬ (было просто layout)
            layoutRoot
            plugins={[continuous]}
            transformTiming={{
              easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
              duration: 500
            }}
          />
        </motion.div>
      </MotionConfig>
    </motion.div>
  );
};

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
  const [hoverInfo, setHoverInfo] = useState<{ time: number; xPercent: number } | null>(null);

  const currentPos = isSeeking ? seekValue : seek;
  const progress = duration > 0 ? (currentPos / duration) * 100 : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    const time = (x / rect.width) * duration;
    setHoverInfo({ time, xPercent: pct });
  };

  const handleMouseLeave = () => {
    if (!isDragging) setHoverInfo(null);
  };

  // While dragging, show tooltip at the thumb position
  const showTooltip = isDragging || hoverInfo !== null;
  const tooltipTime = isDragging ? currentPos : (hoverInfo?.time ?? 0);
  const tooltipX = isDragging ? progress : (hoverInfo?.xPercent ?? 0);

  return (
    <div
      className={styles.playerProgress}
      onMouseDown={onSeekStart}
      onTouchStart={onSeekStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={progressRef}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.progressBarContainer}>
        <div
          className={`${styles.progressBar} ${(isSeeking || isDragging) ? styles.dragging : ''}`}
          style={{ width: `calc(${progress}% + (${(50 - progress) / 50} * 7.5px))` }}
        />
        <motion.div
          className={`${styles.progressThumb} ${(isSeeking || isDragging) ? styles.dragging : ''}`}
          style={{
            left: `calc(${progress}% + (${(50 - progress) / 50} * 11px))`,
            transition: isSeeking ? "none" : undefined,
          }}
          initial={{ width: '17px', height: '12.49px', borderWidth: '2.5px' }}
          // whileHover={{ borderColor: 'transparent', width: '24px', height: '24px', borderWidth: '0.5px' }}
          animate={{
            width: (isSeeking || isDragging) ? '24px' : '17px',
            height: (isSeeking || isDragging) ? '24px' : '12.49px',
            borderWidth: (isSeeking || isDragging) ? '2px' : '2.5px',
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        />

        {/* Time tooltip */}
        <AnimatePresence>
          {showTooltip && duration > 0 && (
            <TooltipTime key="tooltip" seconds={tooltipTime} tooltipX={tooltipX} />
          )}
        </AnimatePresence>
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
            size="sm"
          />

          <div className={styles.playerInfo}>
            <ImageLightbox
              src={currentTrack.cover || "/placeholder.png"}
              alt={currentTrack.title || "Track Cover"}
              width={57}
              height={57}
              className="rounded-[10px]"
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
          <div className={styles.otherControlsWrapper}>
            <div className={styles.other_controls}>
              {/* Main icons — collapse into dropdown on small screens */}
              <div className={styles.mainControls}>
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
                  showPrevious={true}
                />
              </div>

              {/* Compact circular buttons: volume + more */}
              <div className={styles.compactControls}>
                <VolumeSlider />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button view='ghost' className={styles.moreButton}><MoreIcon /></Button>
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
              </div>
            </div>
          </div>
          <div className={styles.progressWrapper}>
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
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerControls;