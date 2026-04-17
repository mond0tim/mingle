import React from 'react';
import styles from './QueueDrawer.module.css';
import { Drawer } from 'vaul';
import { useMediaQuery } from 'react-responsive';
import { QueueIcon } from '@/shared/ui/icons';
import { Button } from '@/components/Button/Button';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DraggableTrackList } from '@/components/DraggableTrackList/DraggableTrackList';
import { usePlayerStore } from '../../store/playerStore';

import { QueueDrawerProps } from "./QueueDrawer.props"

const QueueDrawer: React.FC<QueueDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  tracks,
  currentTrack,
  onTrackSelect,
  playlist
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 640px)' });
  const reorderQueue = usePlayerStore(state => state.reorderQueue);
  const removeTrackFromQueue = usePlayerStore(state => state.removeTrackFromQueue);
  const setTracks = usePlayerStore(state => state.setTracks);

  const clearQueue = () => {
    if (confirm("Очистить очередь?")) {
      setTracks([]);
    }
  }

  const [isFullyOpen, setIsFullyOpen] = React.useState(false);

  // Defer heavy list rendering until the drawer animation completes
  React.useEffect(() => {
    if (isDrawerOpen) {
      const t = setTimeout(() => setIsFullyOpen(true), 250); // wait for Vaul animation
      return () => clearTimeout(t);
    } else {
      setIsFullyOpen(false);
    }
  }, [isDrawerOpen]);

  const snapPoints = ['355px', 1];

  return (
    <Drawer.Root
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      shouldScaleBackground={false}
      modal={!isDesktopOrLaptop}
      direction={isDesktopOrLaptop ? 'right' : 'bottom'}
      fadeFromIndex={0}
      snapPoints={isDesktopOrLaptop ? [1] : snapPoints}
    >
      {isDesktopOrLaptop && (
        <Drawer.Trigger className={styles.QueueDrawerButton} asChild>
          <Button view='ghost' className={styles.queueDrawerTrigger}>
            <QueueIcon />
          </Button>
        </Drawer.Trigger>
      )}

      <Drawer.Portal>
        {!isDesktopOrLaptop && (
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[10]" />
        )}
        <Drawer.Content
          className={`${styles.queueDrawerContent} ${!isDesktopOrLaptop ? styles.mobileQueueDrawer : ''}`}
          style={{ '--initial-transform': '110%' } as React.CSSProperties}
        >
          {!isDesktopOrLaptop && (
            <div className={styles.mobileHandleContainer}>
              <div className={styles.mobileHandle} />
            </div>
          )}
          <Drawer.Title className="sr-only">Queue</Drawer.Title>
          <Drawer.Close asChild>
            <motion.button
              initial={{ scale: 0, translateX: "-50%" }}
              animate={{ scale: 1, translateX: "-50%" }}
              whileHover={{ scale: 1.1, translateX: "-50%" }}
              whileTap={{ scale: 0.9, translateX: "-50%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={styles.queueDrawerCloseButton}
            >
              {isDesktopOrLaptop
                ? <ChevronRight size={16} strokeWidth={3} />
                : <ChevronDown size={16} strokeWidth={3} />
              }
            </motion.button>
          </Drawer.Close>

          <div className={styles.queueDrawerBackground} />

          <div className={styles.drawerTrackList}>
            <div className="flex items-center justify-between px-6 py-4">
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
            <div className={styles.tracklistDrawer}>
              {isFullyOpen ? (
                <DraggableTrackList
                  tracks={tracks}
                  onTrackSelect={onTrackSelect}
                  onReorder={reorderQueue}
                  onRemove={removeTrackFromQueue}
                  currentTrack={currentTrack}
                />
              ) : (
                <div className="flex items-center justify-center h-48 opacity-50">
                  <span>Загрузка очереди...</span>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default QueueDrawer;