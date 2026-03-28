import { useEffect } from 'react';
import { usePlayerStore } from '../store/playerStore';

export const useMediaSession = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const playlistIsPlaying = usePlayerStore((state) => state.playlistIsPlaying);
  const playing = usePlayerStore((state) => state.playing);
  const duration = usePlayerStore((state) => state.duration);
  const seek = usePlayerStore((state) => state.seek);

  // Set Media Session Metadata
  useEffect(() => {
    if (!currentTrack || typeof window === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title || 'Неизвестный трек',
        artist: currentTrack.artist || 'Неизвестный исполнитель',
        album: playlistIsPlaying?.title || '',
        artwork: [
          {
            src: currentTrack.cover || '/placeholder.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
    } catch (error) {
      console.error('MediaSession: Error setting metadata', error);
    }
  }, [currentTrack, playlistIsPlaying]);

  // Set Action Handlers
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.setActionHandler('play', () => {
        usePlayerStore.getState().togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        usePlayerStore.getState().togglePlay();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        usePlayerStore.getState().handlePrevTrack();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        usePlayerStore.getState().handleNextTrack();
      });
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined && details.seekTime !== null) {
          const howlerRef = usePlayerStore.getState().howlerRef;
          if (howlerRef?.current) {
            howlerRef.current.seek(details.seekTime);
            usePlayerStore.getState().setSeek(details.seekTime);
          }
        }
      });
    } catch (error) {
      console.error('MediaSession: Error setting action handlers', error);
    }

    return () => {
      try {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('seekto', null);
      } catch (error) {
        console.error('MediaSession: Error cleaning up action handlers', error);
      }
    };
  }, []); // Only run once on mount

  // Update position state
  useEffect(() => {
    if (playing && 'mediaSession' in navigator && !isNaN(duration) && duration > 0) {
      try {
        navigator.mediaSession.setPositionState({
          duration: duration,
          playbackRate: 1.0,
          position: seek,
        });
      } catch (error) {
        console.error('MediaSession: Error updating positionState:', error);
      }
    }
  }, [playing, duration, seek]);

  // Update playback state
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    }
  }, [playing]);
};
