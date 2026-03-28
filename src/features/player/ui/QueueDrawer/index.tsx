import TrackList from '@/components/TrackList/TrackList';
import React from 'react';
import { Playlist, Track } from '@/types';
import styles from './QueueDrawer.module.css';
import { Drawer } from 'vaul';
import { useMediaQuery } from 'react-responsive';
import { QueueIcon } from '@/shared/ui/icons';
import { Button } from '@/components/Button/Button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <Drawer.Root
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      shouldScaleBackground={false}
      modal={!isDesktopOrLaptop}
      direction={isDesktopOrLaptop ? 'right' : 'bottom'}
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
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        )}
        <Drawer.Content
          className={`${styles.queueDrawerContent} ${!isDesktopOrLaptop ? styles.mobileQueueDrawer : ''}`}
          style={{ '--initial-transform': '110%' } as React.CSSProperties}
        >
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
            <div className="max-w-md mx-auto">
              <Drawer.Title className={styles.drawerTitle}>
                {playlist ? playlist.title : "очередь"}
              </Drawer.Title>
            </div>
            <div className={styles.tracklistDrawer}>
              <TrackList
                tracks={tracks}
                onTrackSelect={onTrackSelect}
                currentTrack={currentTrack}
                trackItemSpanWidth='auto'
                pinned={true}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default QueueDrawer;