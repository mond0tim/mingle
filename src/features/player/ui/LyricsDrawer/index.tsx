import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import styles from './LyricsDrawer.module.css';
import { Track } from '@/types';
import { Button } from '@/components/Button/Button';
import { MicroIcon as TextIcon } from '@/shared/ui/icons';
import cn from 'classnames'
import LyricsContent from '@/components/LyricsContent/LyricsContent';
import { useMediaQuery } from 'react-responsive';
import { ChevronDown, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlayButton } from '../PlaybackButtons/PlaybackButtons';

import { LyricsDrawerProps } from "./LyricsDrawer.props"

const LyricsDrawer: React.FC<LyricsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  currentTrack,
  togglePlay,
  isPlaying,
}) => {
  // Внутреннее состояние, если не переданы пропсы
  const [internalOpen, setInternalOpen] = useState(false);

  // Если drawer управляется извне — используем пропсы, иначе внутреннее состояние
  const open = typeof isDrawerOpen === 'boolean' ? isDrawerOpen : internalOpen;
  const setOpen = setIsDrawerOpen || setInternalOpen;

  // Сброс внутреннего состояния при смене трека (например, чтобы закрывать при смене)
  useEffect(() => {
    if (!setIsDrawerOpen) setInternalOpen(false);
  }, [currentTrack, setIsDrawerOpen]);

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 640px)' });

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={false}
      modal={!isDesktopOrLaptop}
      direction={isDesktopOrLaptop ? 'right' : 'bottom'}
    >
      {isDesktopOrLaptop && (
        <Drawer.Trigger asChild>
          <Button view="ghost" className={styles.LyricsDrawerTrigger}>
            <TextIcon />
          </Button>
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        {!isDesktopOrLaptop && (
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        )}
        <Drawer.Content
          className={` ${styles.lyricsDrawerContent} ${open ? styles.open : styles.closed
            }
          ${!isDesktopOrLaptop ? styles.mobileLyricsDrawer : ''
            }`}
          style={{ '--initial-transform': '110%' } as React.CSSProperties}
        >
          <Drawer.Title className="sr-only">Текст песни</Drawer.Title>
          <Drawer.Description className="sr-only">Текст текущего трека</Drawer.Description>

          <Drawer.Close asChild>
            <motion.button
              initial={{ scale: 0, translateX: "-50%" }}
              animate={{ scale: 1, translateX: "-50%" }}
              whileHover={{ scale: 1.1, translateX: "-50%" }}
              whileTap={{ scale: 0.9, translateX: "-50%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={styles.lyricsDrawerCloseButton}>
              {isDesktopOrLaptop ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}

            </motion.button>
          </Drawer.Close>

          <div className={styles.lyricsDrawerBackground} />
          {!isDesktopOrLaptop && (
            <>
              <div className={styles.mobileLyricsPlayer}>

                <Image
                  src={currentTrack?.cover || '/no-cover.jpg'}
                  alt={currentTrack?.title || 'Track cover'}
                  width={45}
                  height={45}
                  className={styles.mobileLyricsCover}
                />
                <div className={styles.mobileLyricsInfo}>
                  <div className={styles.trackTitle}>{currentTrack?.title}</div>
                  <div className={styles.trackArtist}>{currentTrack?.artist}</div>
                </div>
                <PlayButton
                  isPlaying={isPlaying || false}
                  onClick={togglePlay}
                  variant="solo-mini"
                  className={styles.mobileLyricsPlayerButton}
                />
              </div>



            </>
          )}
          <div className={`${styles.lyricsDrawerInner} h-full`}>

            {/* <Drawer.Title className={styles.drawerTitle}>
              {currentTrack ? currentTrack.title : 'Лирика'}
            </Drawer.Title> */}
            <div className='h-[84%] md:h-full '>
              <LyricsContent
                key={currentTrack?.id}
                currentTrack={currentTrack}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LyricsDrawer;
