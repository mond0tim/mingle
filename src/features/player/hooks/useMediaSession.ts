// import { useEffect } from 'react';
// import { usePlayerStore } from '../store/playerStore';

// export const useMediaSession = () => {
//   const currentTrack = usePlayerStore((state) => state.currentTrack);
//   const playlistIsPlaying = usePlayerStore((state) => state.playlistIsPlaying);
//   const playing = usePlayerStore((state) => state.playing);
//   const duration = usePlayerStore((state) => state.duration);
//   const seek = usePlayerStore((state) => state.seek);

//   // (Удален хак с фоновым аудио по примеру из стабильного кода)
//   // MediaSession API требует только единоразового применения метаданных на смену трека
//   // и установки playbackState при паузе. Постоянные обновления positionState ломают фокус.

//   // 1. Setup MediaSession API (Metadata + Action Handlers)
//   // В точности как в рабочем примере: обновляем только при смене трека,
//   // привязываем все экшены внутри одного эффекта, чтобы избежать пересечений стейта.
//   useEffect(() => {
//     if (!currentTrack || typeof window === 'undefined' || !('mediaSession' in navigator)) {
//       return;
//     }

//     try {
//       // Установка метаданных
//       navigator.mediaSession.metadata = new MediaMetadata({
//         title: currentTrack.title || 'Неизвестный трек',
//         artist: currentTrack.artist || 'Неизвестный исполнитель',
//         album: playlistIsPlaying?.title || '',
//         artwork: [
//           {
//             src: currentTrack.cover || '/placeholder.svg',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//         ],
//       });

//       // Перехват кнопок
//       navigator.mediaSession.setActionHandler('play', () => {
//         usePlayerStore.getState().setPlaying(true);
//       });
//       navigator.mediaSession.setActionHandler('pause', () => {
//         usePlayerStore.getState().setPlaying(false);
//       });
//       navigator.mediaSession.setActionHandler('previoustrack', () => {
//         usePlayerStore.getState().handlePrevTrack();
//       });
//       navigator.mediaSession.setActionHandler('nexttrack', () => {
//         usePlayerStore.getState().handleNextTrack();
//       });
//       navigator.mediaSession.setActionHandler('seekto', (details) => {
//         const { howlerRef, setSeek } = usePlayerStore.getState();
//         if (details.seekTime !== undefined && details.seekTime !== null && howlerRef?.current) {
//           howlerRef.current.seek(details.seekTime);
//           setSeek(details.seekTime);
//         }
//       });
//     } catch (error) {
//       console.error('MediaSession: Error applying handlers', error);
//     }

//     return () => {
//       if ('mediaSession' in navigator) {
//         try {
//           navigator.mediaSession.setActionHandler('play', null);
//           navigator.mediaSession.setActionHandler('pause', null);
//           navigator.mediaSession.setActionHandler('previoustrack', null);
//           navigator.mediaSession.setActionHandler('nexttrack', null);
//           navigator.mediaSession.setActionHandler('seekto', null);
//         } catch (e) { }
//       }
//     };
//   }, [currentTrack, playlistIsPlaying]);

//   // 2. Установка состояния проигрывания строго при изменении playing
//   useEffect(() => {
//     if ('mediaSession' in navigator) {
//       navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
//     }
//   }, [playing]);
// };
