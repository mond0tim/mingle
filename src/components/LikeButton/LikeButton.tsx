"use client";

import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Heart } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import cn from 'classnames';

interface LikeButtonProps {
  trackId: string | number;
  className?: string;
  size?: number;
  children?: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const LikeButton: React.FC<LikeButtonProps> = ({ trackId, className, size = 20, children }) => {
  const { mutate } = useSWRConfig();

  // Получаем список лайкнутых треков (можем кешировать это глобально)
  const { data, error, isLoading } = useSWR('/api/favorites/tracks', fetcher);

  const isLiked = data?.tracks?.some((t: any) => t.id === trackId);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Оптимистичное обновление
    const tracks = data?.tracks || [];
    const optimisticData = {
      ...data,
      tracks: isLiked
        ? tracks.filter((t: any) => t.id !== trackId)
        : [...tracks, { id: trackId }]
    };

    mutate('/api/favorites/tracks', optimisticData, false);

    try {
      const res = await fetch('/api/favorites/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId })
      });

      if (!res.ok) throw new Error('Failed to toggle like');

      // Ревалидация после запроса
      mutate('/api/favorites/tracks');
    } catch (err) {
      console.error(err);
      // Возвращаем старое состояние при ошибке
      mutate('/api/favorites/tracks');
    }
  };

  return (
    <Button
      view="ghost"
      size="icon"
      className={cn(className, "transition-colors md:!w-[24px] md:!h-[24px]")}
      onClick={toggleLike}
      disabled={isLoading}
      title={isLiked ? "Удалить из избранного" : "Добавить в избранное"}
    >
      <Heart
        size={size}
        className={cn(isLiked ? "fill-red-500 stroke-red-500" : "stroke-current opacity-60 hover:opacity-100")}
      />
      {children}
    </Button>
  );
};
