"use client";

import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import styles from '../LikeButton/LikeButton.module.css';

// Импортируем общие иконки и варианты анимаций из файла LikeButton
// (Убедитесь, что пути импорта совпадают с вашей структурой проекта)
import { HEART_ICONS, outlineVariants, filledVariants, ghostVariants } from '../LikeButton/LikeButton';

interface LikePlaylistButtonProps {
  playlistId: string | number;
  className?: string;
  size?: number;
  iconVariant?: 'small' | 'large';
  children?: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const LikePlaylistButton: React.FC<LikePlaylistButtonProps> = ({
  playlistId,
  className,
  size = 20,
  iconVariant = 'large', // По умолчанию большая иконка для плейлистов
  children
}) => {
  const { mutate } = useSWRConfig();

  const { data, isLoading } = useSWR('/api/favorites/playlists', fetcher);

  const isLiked = data?.playlists?.some((p: any) => String(p.id) === String(playlistId));

  const [isTriggered, setIsTriggered] = React.useState(false);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsTriggered(true);

    const playlists = data?.playlists || [];
    const optimisticData = {
      ...data,
      playlists: isLiked
        ? playlists.filter((p: any) => String(p.id) !== String(playlistId))
        : [...playlists, { id: playlistId }]
    };

    mutate('/api/favorites/playlists', optimisticData, false);

    try {
      const res = await fetch('/api/favorites/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistId })
      });

      if (!res.ok) throw new Error('Failed to toggle like');

      mutate('/api/favorites/playlists');
    } catch (err) {
      console.error(err);
      mutate('/api/favorites/playlists');
    }
  };

  const currentIcon = HEART_ICONS[iconVariant];
  const animateState = isLiked ? "liked" : "unliked";

  // Цвета для плейлиста: красный при активе, полупрозрачный при неактиве
  const activeColorClass = "text-red-500";
  const inactiveColorClass = "text-current opacity-60 hover:opacity-100";

  return (
    <motion.button
      type="button"
      className={cn(styles.button, "transition-colors", className)}
      onClick={toggleLike}
      disabled={isLoading}
      title={isLiked ? "Удалить из медиатеки" : "Добавить в медиатеку"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
    >
      <div className={styles.wrapper} style={{ width: size, height: size }}>
        <motion.div
          className={cn(styles.layer, inactiveColorClass)}
          variants={outlineVariants}
          initial={false}
          animate={animateState}
        >
          {currentIcon.outline}
        </motion.div>

        <motion.div
          className={cn(styles.layer, activeColorClass)}
          variants={filledVariants}
          initial={false}
          animate={animateState}
        >
          {currentIcon.filled}
        </motion.div>

        <AnimatePresence>
          {isLiked && isTriggered && (
            <motion.div
              className={cn(styles.layer, activeColorClass)}
              variants={ghostVariants}
              initial="unliked"
              animate="liked"
              onAnimationComplete={() => setIsTriggered(false)}
            >
              {currentIcon.filled}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </motion.button>
  );
};