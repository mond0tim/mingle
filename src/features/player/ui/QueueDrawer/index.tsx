import React from 'react';
import styles from './QueueDrawer.module.css';
import { Drawer } from 'vaul';
import { useMediaQuery } from 'react-responsive';
import { QueueIcon } from '@/shared/ui/icons';
import { Toggle } from '@/components/animate-ui/components/radix/toggle';
import { Button } from '@/components/Button/Button';
import { ChevronDown, ChevronRight, ChevronUp, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableTrackList } from '@/components/DraggableTrackList/DraggableTrackList';
import { usePlayerStore } from '../../store/playerStore';
import { CurvedScrollbar } from '../CurvedScrollbar';
import { Skeleton } from '@/components/ui/skeleton';

import { QueueDrawerProps } from "./QueueDrawer.props"

const QueueDrawer: React.FC<QueueDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  tracks,
  currentTrack,
  onTrackSelect,
  playlist,
  scrollToMode = 'start',
  showPrevious = true
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 640px)' });
  const reorderQueue = usePlayerStore(state => state.reorderQueue);
  const removeTrackFromQueue = usePlayerStore(state => state.removeTrackFromQueue);
  const setTracks = usePlayerStore(state => state.setTracks);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const clearQueue = () => {
    if (confirm("Очистить очередь?")) {
      setTracks([]);
    }
  }

  const [isFullyOpen, setIsFullyOpen] = React.useState(false);
  const snapPoints = ['355px', 1];
  const [snap, setSnap] = React.useState<number | string | null>(snapPoints[0]);

  // Handle scroll to current track
  React.useEffect(() => {
    if (isFullyOpen && currentTrack && contentRef.current) {
      const scrollTimeout = setTimeout(() => {
        const playingElement = contentRef.current?.querySelector(`[data-queue-id="${currentTrack.queueId}"]`) as HTMLElement;
        if (playingElement) {
          let targetElement = playingElement;

          if (showPrevious) {
            const previousElement = playingElement.previousElementSibling as HTMLElement;
            if (previousElement) {
              targetElement = previousElement;
            }
          }

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: scrollToMode
          });
        }
      }, 300); // Increased timeout slightly for reliability
      return () => clearTimeout(scrollTimeout);
    }
  }, [isFullyOpen, scrollToMode, showPrevious, currentTrack?.queueId]);

  // Defer heavy list rendering until the drawer animation completes
  React.useEffect(() => {
    if (isDrawerOpen) {
      const t = setTimeout(() => setIsFullyOpen(true), 250); // wait for Vaul animation
      return () => clearTimeout(t);
    } else {
      setIsFullyOpen(false);
    }
  }, [isDrawerOpen]);

  return (
    <Drawer.Root
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      shouldScaleBackground={false}
      modal={!isDesktopOrLaptop}
      direction={isDesktopOrLaptop ? 'right' : 'bottom'}
      fadeFromIndex={0}
      snapPoints={isDesktopOrLaptop ? [1] : snapPoints}
      activeSnapPoint={isDesktopOrLaptop ? 1 : snap}
      setActiveSnapPoint={setSnap}
    >
      {isDesktopOrLaptop && (
        <Drawer.Trigger className={styles.QueueDrawerButton} asChild>
          <Toggle
            pressed={isDrawerOpen}
            onPressedChange={setIsDrawerOpen}
            size="icon"
            className={styles.queueDrawerTrigger}
            highlightClassName={styles.toggleHighlight}
          >
            <QueueIcon />
          </Toggle>
        </Drawer.Trigger>
      )}

      <Drawer.Portal>
        {!isDesktopOrLaptop && (
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[10]" />
        )}
        <Drawer.Content
          className={`${styles.queueDrawerContent} ${!isDesktopOrLaptop ? styles.mobileQueueDrawer : ''}`}
          style={{ '--initial-transform': '110%' } as React.CSSProperties}
          data-snap={isDesktopOrLaptop ? 1 : snap}
        >
          <div ref={containerRef} className="relative flex flex-col h-full w-full overflow-hidden">
            {/* {!isDesktopOrLaptop && (
              <div className={styles.mobileHandleContainer}>
                <div className={styles.mobileHandle} />
              </div>
            )} */}
            <Drawer.Title className="sr-only">Queue</Drawer.Title>
            <AnimatePresence>
              {/* Close Button */}
              <Drawer.Close asChild key="close">
                <motion.button
                  initial={{ scale: 0, x: isDesktopOrLaptop ? 0 : "-50%", right: isDesktopOrLaptop ? '13px' : "50%", translateX: isDesktopOrLaptop ? 0 : "50%" }}
                  animate={{
                    scale: 1,
                    right: isDesktopOrLaptop ? '13px' : "50%",
                    translateX: isDesktopOrLaptop ? 0 : "50%",
                    x: (!isDesktopOrLaptop && snap !== 1) ? 25 : 0
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className={styles.queueDrawerCloseButton}
                  style={{ position: 'absolute' }}
                >
                  {isDesktopOrLaptop
                    ? <ChevronRight size={16} strokeWidth={4} />
                    : <ChevronDown size={16} strokeWidth={4} />
                  }
                </motion.button>
              </Drawer.Close>

              {/* Expand Button (Mobile Only) */}
              {!isDesktopOrLaptop && snap !== 1 && (
                <motion.button
                  key="expand"
                  initial={{ scale: 0, x: "-50%", left: "50%", translateX: "-50%", opacity: 0 }}
                  animate={{
                    scale: 1,
                    left: "50%",
                    translateX: "-50%",
                    x: -25,
                    opacity: 1
                  }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className={styles.queueDrawerExpandButton}
                  onClick={() => setSnap(1)}
                  style={{ position: 'absolute' }}
                >
                  <ChevronUp size={16} strokeWidth={4} />
                </motion.button>
              )}
            </AnimatePresence>

            <div className={styles.queueDrawerBackground} />

            <div className={styles.drawerTrackList}>
              <div className="flex items-center justify-start px-6 py-4 pb-0">
                <Drawer.Title className={styles.drawerTitle}>
                  {playlist ? playlist.title : "очередь"}
                </Drawer.Title>
                <Drawer.Description className="sr-only">Очередь текущих треков</Drawer.Description>
                {tracks.length > 0 && (
                  <Button view="ghost" size="icon" onClick={clearQueue} className="opacity-40 hover:opacity-100 hover:text-red-500">
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
              <div ref={contentRef} className={styles.tracklistDrawer}>
                {isFullyOpen ? (
                  <DraggableTrackList
                    tracks={tracks}
                    onTrackSelect={onTrackSelect}
                    onReorder={reorderQueue}
                    onRemove={removeTrackFromQueue}
                    currentTrack={currentTrack}
                  />
                ) : (
                  <div className="flex flex-col gap-1 px-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 opacity-20">
                        <Skeleton className="h-12 w-12 rounded-lg bg-white/40" />
                        <div className="flex flex-col gap-2 flex-1">
                          <Skeleton className="h-4 w-2/3 rounded bg-white/40" />
                          <Skeleton className="h-3 w-1/3 rounded bg-white/40" />
                        </div>
                        <Skeleton className="h-4 w-4 rounded-full bg-white/40" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <CurvedScrollbar
              containerRef={containerRef}
              contentRef={contentRef}
              isCurved={true}
              borderRadius={isDesktopOrLaptop ? 30 : 20}
              watch={[tracks, isFullyOpen]}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default QueueDrawer;