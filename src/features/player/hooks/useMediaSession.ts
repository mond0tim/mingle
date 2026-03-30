import { useEffect } from 'react';
import { usePlayerStore } from '../store/playerStore';

export const useMediaSession = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const playing = usePlayerStore((state) => state.playing);
  const duration = usePlayerStore((state) => state.duration);
  const playlistIsPlaying = usePlayerStore((state) => state.playlistIsPlaying);

  // 1. ПРИВЯЗКА КНОПОК И ПОЛЗУНКА (ВЫПОЛНЯЕТСЯ СТРОГО 1 РАЗ)
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    let seekTimeout: NodeJS.Timeout | null = null;
    let pendingSeekTime: number | null = null;

    // Используем getState(), чтобы всегда получать актуальные данные без ререндеров
    navigator.mediaSession.setActionHandler('play', () => {
      const state = usePlayerStore.getState();
      if (!state.playing) state.togglePlay();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      const state = usePlayerStore.getState();
      if (state.playing) state.togglePlay();
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      usePlayerStore.getState().handlePrevTrack();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      usePlayerStore.getState().handleNextTrack();
    });

    const handleDebouncedSeek = (newTime: number, state: any) => {
      pendingSeekTime = newTime;
      
      if (!state.isGlobalSeeking) {
         state.setIsGlobalSeeking(true);
      }

      if (seekTimeout) clearTimeout(seekTimeout);

      if ('setPositionState' in navigator.mediaSession && state.duration > 0) {
        try {
          navigator.mediaSession.setPositionState({
            duration: state.duration,
            playbackRate: 1,
            position: Math.max(0, Math.min(pendingSeekTime, state.duration)),
          });
        } catch (e) { }
      }

      state.setSeek(pendingSeekTime);

      seekTimeout = setTimeout(() => {
        if (pendingSeekTime !== null) {
          usePlayerStore.getState().handleSeek(pendingSeekTime);
          usePlayerStore.getState().setIsGlobalSeeking(false);
          pendingSeekTime = null;
        }
      }, 300); // 300мс дебаунс (надежнее для защиты от множественных экземпляров)
    };

    // Обработка "перетягивания" ползунка в ОС
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      const state = usePlayerStore.getState();
      if (details.seekTime !== undefined && details.seekTime !== null) {
        handleDebouncedSeek(details.seekTime, state);
      }
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const state = usePlayerStore.getState();
      const skipTime = details.seekOffset || 10;
      // Если мы уже мотаем (естьpendingSeekTime), берем его, чтобы не "проскакивать"
      const currentSeek = pendingSeekTime ?? ((state.howlerInstance?.seek() as number) || 0);
      const newTime = Math.min(currentSeek + skipTime, state.duration);
      handleDebouncedSeek(newTime, state);
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const state = usePlayerStore.getState();
      const skipTime = details.seekOffset || 10;
      const currentSeek = pendingSeekTime ?? ((state.howlerInstance?.seek() as number) || 0);
      const newTime = Math.max(currentSeek - skipTime, 0);
      handleDebouncedSeek(newTime, state);
    });

    return () => {
      // Очистка при полном размонтировании приложения
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('seekto', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('seekbackward', null);
      }
    };
  }, []); // <-- ПУСТОЙ МАССИВ! Защищает от краша при перетягивании ползунка!

  // 2. ОБНОВЛЕНИЕ МЕТАДАННЫХ (ТОЛЬКО ПРИ СМЕНЕ ПЕСНИ)
  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator)) return;

    const getAbsoluteUrl = (path: string) => {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      return `${window.location.origin}${path}`;
    };

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title || 'Неизвестный трек',
      artist: currentTrack.artist || 'Неизвестный исполнитель',
      album: playlistIsPlaying?.title || '',
      artwork: [
        {
          src: getAbsoluteUrl(currentTrack.cover || '/placeholder.svg'),
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    });
  }, [currentTrack?.id]); // Зависит только от ID, а не от всего объекта

  // 3. СИНХРОНИЗАЦИЯ СТАТУСА ПАУЗЫ (ДЕРЖИТ УВЕДОМЛЕНИЕ ОТКРЫТЫМ)
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    }
  }, [playing]);
};