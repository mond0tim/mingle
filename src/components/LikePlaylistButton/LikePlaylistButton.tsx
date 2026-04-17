"use client";

import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Heart } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import cn from 'classnames';

interface LikePlaylistButtonProps {
  playlistId: string | number;
  className?: string;
  size?: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const LikePlaylistButton: React.FC<LikePlaylistButtonProps> = ({ playlistId, className, size = 20 }) => {
  const { mutate } = useSWRConfig();
  
  // Получаем список лайкнутых плейлистов
  const { data, isLoading } = useSWR('/api/favorites/playlists', fetcher);
  
  const isLiked = data?.playlists?.some((p: any) => String(p.id) === String(playlistId));

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Оптимистичное обновление
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

  return (
    <Button
      view="ghost"
      size="icon"
      className={cn(className, "transition-all duration-300 hover:scale-110")}
      onClick={toggleLike}
      disabled={isLoading}
      title={isLiked ? "Удалить из медиатеки" : "Добавить в медиатеку"}
    >
      <Heart 
        size={size} 
        className={cn(isLiked ? "fill-red-500 stroke-red-500" : "stroke-current opacity-60 hover:opacity-100")} 
      />
    </Button>
  );
};
