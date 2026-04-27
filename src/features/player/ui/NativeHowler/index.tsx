"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Howl } from 'howler';

export interface NativeHowlerProps {
  src: string;
  playing: boolean;
  volume: number;
  html5?: boolean;
  preload?: boolean;
  onEnd?: () => void;
  onLoad?: () => void;
  onLoadError?: (id: number, error: unknown) => void;
  onPlayError?: (id: number, error: unknown) => void;
}

export interface NativeHowlerRef {
  seek: (time?: number) => number;
  duration: () => number;
  howler: Howl | null;
  stop: () => void;
}

const NativeHowler = forwardRef<NativeHowlerRef, NativeHowlerProps>((props, ref) => {
  const { src, playing, volume, html5 = true, preload = true, onEnd, onLoad, onLoadError, onPlayError } = props;
  
  const howlerRef = useRef<Howl | null>(null);

  // Предоставляем те же методы, что и старый ReactHowler, для совместимости
  useImperativeHandle(ref, () => ({
    seek: (time?: number) => {
      if (!howlerRef.current) return 0;
      if (time !== undefined) {
        howlerRef.current.seek(time);
        return time;
      }
      return (howlerRef.current.seek() as number) || 0;
    },
    duration: () => howlerRef.current?.duration() || 0,
    howler: howlerRef.current,
    stop: () => howlerRef.current?.stop(),
  }));

  // Создание и удаление инстанса (решает проблему утечек и множащихся аудио в React 19)
  useEffect(() => {
    if (!src) return;

    console.log("NativeHowler: Инициализация нового Howl инстанса", src);
    
    const newHowler = new Howl({
      src: [src],
      html5,
      preload,
      volume,
      onend: () => onEnd?.(),
      onload: () => onLoad?.(),
      onloaderror: (id, error) => onLoadError?.(id, error),
      onplayerror: (id, error) => onPlayError?.(id, error),
    });

    howlerRef.current = newHowler;

    // Сразу включаем, если пропс требует этого
    if (playing) {
      newHowler.play();
    }

    return () => {
      console.log("NativeHowler: Отключение (Unload) старого инстанса");
      newHowler.stop();
      newHowler.unload();
      howlerRef.current = null;
    };
  }, [src]);

  // Управление паузой/воспроизведением без пересоздания ноды
  useEffect(() => {
    const sound = howlerRef.current;
    if (!sound) return;

    const isCurrentlyPlaying = sound.playing();

    if (playing && !isCurrentlyPlaying) {
      sound.play();
    } else if (!playing && isCurrentlyPlaying) {
      sound.pause();
    }
  }, [playing]);

  // Управление громкостью
  useEffect(() => {
    if (howlerRef.current) {
      howlerRef.current.volume(volume);
    }
  }, [volume]);

  // Ничего не рендерим визуально
  return null;
});

NativeHowler.displayName = 'NativeHowler';
export default NativeHowler;
