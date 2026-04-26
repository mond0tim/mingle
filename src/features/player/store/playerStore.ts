import { create } from 'zustand';
import type { Track, Playlist } from '@/types';
import React from 'react';
import { Howl, Howler } from 'howler';

/**
 * Обертка для трека в очереди с уникальным ID.
 * Это позволяет добавлять один и тот же трек в очередь несколько раз
 */
export interface QueueItem extends Track {
  queueId: string; 
}

interface PlayerState {
  currentTrack: QueueItem | null;
  playing: boolean;
  duration: number;
  seek: number;
  howlerState: string;
  isQueueDrawerOpen: boolean;
  isLyricsDrawerOpen: boolean;
  playlistIsPlaying: Playlist | null;
  tracks: QueueItem[]; 
  originalPlaylistId: string | null;
  isMuted: boolean;
  volume: number;
  initialPlaylists: Playlist[];
  isGlobalSeeking: boolean;

  // Actions
  playTrack: (track: Track, playlist?: Playlist, autoplay?: boolean) => void;
  playPlaylist: (playlist: Playlist, track?: Track, autoplay?: boolean) => void;
  playTracks: (tracks: Track[], trackToPlay?: Track, playlist?: Playlist, autoplay?: boolean) => void;
  togglePlay: () => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  handleOnEnd: () => void;
  handleSeek: (time: number) => void;
  setCurrentTrack: (track: QueueItem | null) => void;
  setPlaying: (playing: boolean) => void;
  setDuration: (duration: number) => void;
  setSeek: (seek: number) => void;
  setTracks: (tracks: Track[], syncWithDb?: boolean) => void;
  addTrackToQueue: (track: Track) => void;
  addTrackNext: (track: Track) => void;
  removeTrackFromQueue: (queueId: string) => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  setHowlerState: (state: string) => void;
  setIsQueueDrawerOpen: (isOpen: boolean) => void;
  setIsLyricsDrawerOpen: (isOpen: boolean) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setInitialPlaylists: (playlists: Playlist[]) => void;
  setIsGlobalSeeking: (isSeeking: boolean) => void;
  hydrateState: (queue: QueueItem[], playlist: Playlist | null, track: Track | null) => void;
  updateTrackColors: (trackId: string, colors: any) => void;

  // Refs
  howlerInstance: Howl | null;
  setHowlerInstance: (instance: Howl | null) => void;
  audioContext: React.RefObject<AudioContext | null>;
  setAudioContext: (ref: React.RefObject<AudioContext | null>) => void;
  audioNode: React.RefObject<MediaElementAudioSourceNode | null>;
  setAudioNode: (ref: React.RefObject<MediaElementAudioSourceNode | null>) => void;
}

let syncTimeout: NodeJS.Timeout | null = null;

// Идемпотентная обертка: возвращает существующий queueId или создает новый
const wrapTrack = (track: Track | QueueItem): QueueItem => {
    if ('queueId' in track && track.queueId) return track as QueueItem;
    return {
        ...track,
        queueId: Math.random().toString(36).slice(2, 11) + Date.now()
    };
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  playing: false,
  duration: 0,
  seek: 0,
  howlerState: 'unloaded',
  isQueueDrawerOpen: false,
  isLyricsDrawerOpen: false,
  playlistIsPlaying: null,
  tracks: [],
  originalPlaylistId: null,
  isMuted: false,
  volume: 1.0,
  initialPlaylists: [],
  isGlobalSeeking: false,
  howlerInstance: null,
  audioContext: React.createRef<AudioContext>(),
  audioNode: React.createRef<MediaElementAudioSourceNode>(),

  setHowlerInstance: (instance) => set({ howlerInstance: instance }),
  setAudioContext: (ref) => set({ audioContext: ref }),
  setAudioNode: (ref) => set({ audioNode: ref }),
  setInitialPlaylists: (playlists) => set({ initialPlaylists: playlists }),

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaying: (playing) => set({ playing }),
  setDuration: (duration) => set({ duration }),
  setSeek: (seek) => set({ seek }),
  
  setTracks: (tracks, syncWithDb = true) => {
    // Каждый трек ДОЛЖЕН иметь уникальный queueId.
    const queueItems: QueueItem[] = tracks.map(t => wrapTrack(t));
    
    set({ tracks: queueItems });

    if (syncWithDb) {
      if (syncTimeout) clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => {
          const state = get();
          fetch('/api/queue', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              queue: queueItems,
              lastPlayedTrackId: state.currentTrack?.id,
              lastPlayedPlaylistId: state.originalPlaylistId || state.playlistIsPlaying?.id
            })
          }).catch(err => console.error("Queue sync error:", err));
      }, 2000); // Уменьшаем до 2 сек
    }
  },

  addTrackToQueue: (track) => {
    const { tracks, setTracks } = get();
    const newTracks = [...tracks, wrapTrack(track)];
    setTracks(newTracks);
  },

  addTrackNext: (track) => {
    const { tracks, setTracks, currentTrack } = get();
    const wrapped = wrapTrack(track);
    if (!currentTrack) {
        setTracks([...tracks, wrapped]);
        return;
    }
    const currentIndex = tracks.findIndex(t => t.queueId === currentTrack.queueId);
    const newTracks = [...tracks];
    newTracks.splice(currentIndex + 1, 0, wrapped);
    setTracks(newTracks);
  },

  removeTrackFromQueue: (queueId) => {
    const { tracks, setTracks, currentTrack } = get();
    const newTracks = tracks.filter(t => t.queueId !== queueId);
    setTracks(newTracks);
    if (currentTrack?.queueId === queueId) {
      get().handleNextTrack();
    }
  },

  reorderQueue: (startIndex, endIndex) => {
    const { tracks, setTracks } = get();
    const result = Array.from(tracks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTracks(result);
  },

  setHowlerState: (state) => set({ howlerState: state }),
  setIsQueueDrawerOpen: (isOpen) => set({ isQueueDrawerOpen: isOpen }),
  setIsLyricsDrawerOpen: (isOpen) => set({ isLyricsDrawerOpen: isOpen }),
  setVolume: (volume) => {
    const { howlerInstance } = get();
    if (howlerInstance) howlerInstance.volume(volume);
    set({ volume });
  },
  setIsGlobalSeeking: (isGlobalSeeking) => set({ isGlobalSeeking }),
  toggleMute: () => {
    const { howlerInstance, isMuted, volume } = get();
    const nextMuted = !isMuted;
    if (howlerInstance) howlerInstance.volume(nextMuted ? 0 : volume);
    set({ isMuted: nextMuted });
  },

  playTrack: (track, playlist, autoplay = true) => {
    const { howlerInstance, setDuration, volume, tracks, originalPlaylistId } = get();
    
    // Сразу пишем в историю
    fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            trackId: track.id, 
            playlistId: playlist?.id || originalPlaylistId,
            listenedSec: 0 
        })
    }).catch(e => {});

    if (howlerInstance) {
      howlerInstance.stop();
      howlerInstance.unload();
    }
    
    const streamUrl = `/api/stream/${track.id}`;
    const extension = track.src.split('.').pop()?.toLowerCase() || 'mp3';
    
    const newHowler = new Howl({
      src: [streamUrl],
      format: [extension],
      html5: true,
      preload: true,
      volume: volume,
      onend: () => get().handleOnEnd(),
      onload: () => {
        const dur = newHowler.duration();
        if (!isNaN(dur) && dur > 0) {
          setDuration(dur);
          if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
            try {
              navigator.mediaSession.setPositionState({ duration: dur, playbackRate: 1, position: 0 });
            } catch (e) {}
          }
        }
      },
    });

    const queueItem = wrapTrack(track);

    set((state) => {
        let newTracks = [...state.tracks];
        let queueItemToUse = queueItem;
        
        if (playlist) {
            // Если мы переключаемся на НОВЫЙ плейлист
            if (state.originalPlaylistId !== String(playlist.id)) {
                newTracks = playlist.tracks.map(t => wrapTrack(t));
                // Находим нужный трек в новом newTracks, чтобы queueId совпал
                const foundTrack = newTracks.find(t => t.id === track.id);
                if (foundTrack) {
                    queueItemToUse = foundTrack;
                } else {
                    newTracks.unshift(queueItemToUse); 
                }
            } else {
                // Плейлист тот же! Ищем уже созданный queueItem
                if ('queueId' in track && track.queueId) {
                    const exactTrack = newTracks.find(t => t.queueId === track.queueId);
                    if (exactTrack) queueItemToUse = exactTrack;
                } else {
                    const foundTrack = newTracks.find(t => t.id === track.id);
                    if (foundTrack) {
                        queueItemToUse = foundTrack;
                    } else {
                        const exists = newTracks.some(t => t.queueId === queueItem.queueId);
                        if (!exists) {
                            newTracks.push(queueItem);
                        }
                    }
                }
            }
        } else {
            // Если трека нет в очереди, добавляем его ПЕРЕД проигрыванием
            const exists = newTracks.some(t => t.queueId === queueItem.queueId);
            if (!exists) {
                newTracks.push(queueItem);
            }
        }

        // Сохраняем последний трек/плейлист в localStorage для сверхбыстрого восстановления (оптимистично)
        try {
          const playlistId = playlist ? String(playlist.id) : state.originalPlaylistId;
          localStorage.setItem('mingle_last_played', JSON.stringify([{
            playlistId,
            trackId: String(track.id),
          }]));
        } catch {}

        // Синхронизируем с БД (без дебаунса для смены трека)
        const playlistId = playlist ? String(playlist.id) : state.originalPlaylistId;
        fetch('/api/queue', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                lastPlayedTrackId: track.id,
                lastPlayedPlaylistId: playlistId
            })
        }).catch(() => {});

        return {
            howlerInstance: newHowler,
            currentTrack: queueItemToUse,
            playlistIsPlaying: playlist || state.playlistIsPlaying,
            originalPlaylistId: playlist ? String(playlist.id) : state.originalPlaylistId,
            tracks: newTracks,
            playing: autoplay,
        };
    });

    if (autoplay) {
      newHowler.play();
    }

    // Preload next track silently
    setTimeout(() => {
      const state = get();
      if (state.currentTrack && state.tracks.length > 1) {
        const currentIndex = state.tracks.findIndex((t) => t.queueId === state.currentTrack?.queueId);
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % state.tracks.length;
          const nextTrack = state.tracks[nextIndex];
          if (nextTrack) {
            // Initiate a silent preload request for the next track
            const preloader = new Audio();
            preloader.preload = 'auto'; // Browsers decide how much to buffer (usually the first few seconds)
            preloader.src = `/api/stream/${nextTrack.id}`;
          }
        }
      }
    }, 1000);
  },

  hydrateState: (queue, playlist, track) => {
    // Безопасно восстанавливаем стейт из БД и кэша
    if (!track) return;
    const { volume, setDuration, howlerInstance } = get();

    if (howlerInstance) {
      howlerInstance.stop();
      howlerInstance.unload();
    }

    const streamUrl = `/api/stream/${track.id}`;
    const extension = track.src?.split('.').pop()?.toLowerCase() || 'mp3';
    
    // Инициализируем Howler без auto-play (он на паузе)
    const newHowler = new Howl({
      src: [streamUrl],
      format: [extension],
      html5: true,
      preload: true,
      volume: volume,
      onend: () => get().handleOnEnd(),
      onload: () => {
        const dur = newHowler.duration();
        if (!isNaN(dur) && dur > 0) {
          setDuration(dur);
          if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
            try {
              navigator.mediaSession.setPositionState({ duration: dur, playbackRate: 1, position: 0 });
            } catch (e) {}
          }
        }
      },
    });

    // Гарантируем каждому элементу очереди уникальный queueId
    const wrappedQueue: QueueItem[] = queue.map(t => wrapTrack(t));
    // Находим текущий трек в обернутой очереди
    const queueItem = wrappedQueue.find(t => t.id === track.id) || wrapTrack(track);

    set({
      howlerInstance: newHowler,
      currentTrack: queueItem,
      playlistIsPlaying: playlist,
      originalPlaylistId: playlist ? String(playlist.id) : null,
      tracks: wrappedQueue,
      playing: false,
    });
  },

  playPlaylist: (playlist, track, autoplay = true) => {
    if (!playlist) return;
    const tracks = playlist.tracks || [];
    const trackToPlay = track ? track : (tracks.length > 0 ? tracks[0] : null);
    
    if (trackToPlay) {
      get().playTrack(trackToPlay, playlist, autoplay);
    } else {
      set({ 
        playlistIsPlaying: playlist,
        tracks: tracks.map(t => wrapTrack(t)),
        playing: false,
      });
    }
  },

  playTracks: (tracks, trackToPlay, playlist, autoplay = true) => {
    const wrappedTracks = tracks.map(t => wrapTrack(t));
    const firstTrack = trackToPlay || wrappedTracks[0] || null;
    
    if (!firstTrack) return;

    // Use playTrack logic but with the new tracks array
    const { howlerInstance, volume } = get();
    if (howlerInstance) {
      howlerInstance.stop();
      howlerInstance.unload();
    }

    const streamUrl = `/api/stream/${firstTrack.id}`;
    const extension = firstTrack.src.split('.').pop()?.toLowerCase() || 'mp3';
    
    const newHowler = new Howl({
      src: [streamUrl],
      format: [extension],
      html5: true,
      preload: true,
      volume: volume,
      onend: () => get().handleOnEnd(),
      onload: () => {
        const dur = newHowler.duration();
        if (!isNaN(dur) && dur > 0) {
          get().setDuration(dur);
        }
      },
    });

    const queueItem = wrapTrack(firstTrack);

    set({
      howlerInstance: newHowler,
      currentTrack: queueItem,
      playlistIsPlaying: playlist || null,
      originalPlaylistId: playlist ? String(playlist.id) : null,
      tracks: wrappedTracks,
      playing: autoplay,
    });

    if (autoplay) newHowler.play();
  },

  togglePlay: () => {
    const { howlerInstance, playing } = get();
    if (howlerInstance) {
      if (playing) howlerInstance.pause();
      else howlerInstance.play();
    }
    set({ playing: !playing });
  },

  handleNextTrack: () => {
    const { currentTrack, tracks, playlistIsPlaying, playTrack } = get();
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((t) => t.queueId === currentTrack.queueId);
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(tracks[nextTrackIndex], playlistIsPlaying ?? undefined);
    }
  },

  handlePrevTrack: () => {
    const { currentTrack, tracks, playlistIsPlaying, playTrack } = get();
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((t) => t.queueId === currentTrack.queueId);
      const prevTrackIndex = currentTrackIndex <= 0 ? tracks.length - 1 : currentTrackIndex - 1;
      playTrack(tracks[prevTrackIndex], playlistIsPlaying ?? undefined);
    }
  },

  handleSeek: (time: number) => {
    const { howlerInstance, duration } = get();
    if (howlerInstance) howlerInstance.seek(time);
    set({ seek: time });
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && 'setPositionState' in navigator.mediaSession && duration > 0) {
      try {
        navigator.mediaSession.setPositionState({
          duration: duration,
          playbackRate: 1,
          position: Math.max(0, Math.min(time, duration)),
        });
      } catch (e) {}
    }
  },

  handleOnEnd: () => {
    const { currentTrack, tracks, playlistIsPlaying, originalPlaylistId, playTrack, setPlaying, howlerInstance } = get();
    if (currentTrack) {
        const listenedSec = howlerInstance ? Math.floor(howlerInstance.duration()) : 0;
        fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                trackId: currentTrack.id, 
                playlistId: originalPlaylistId,
                listenedSec 
            })
        }).catch(err => {});
    }

    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((t) => t.queueId === currentTrack.queueId);
      if (currentTrackIndex !== -1 && currentTrackIndex < tracks.length - 1) {
        playTrack(tracks[currentTrackIndex + 1], playlistIsPlaying ?? undefined);
      } else if (playlistIsPlaying) {
        playTrack(tracks[0], playlistIsPlaying);
      } else {
        setPlaying(false);
      }
    } else {
      setPlaying(false);
    }
  },
  updateTrackColors: (trackId, colors) => {
    set((state) => {
      const matchId = String(trackId);
      const updatedTracks = state.tracks.map(t => 
        String(t.id) === matchId ? { ...t, colors } : t
      );
      
      let updatedCurrentTrack = state.currentTrack;
      if (state.currentTrack && String(state.currentTrack.id) === matchId) {
        updatedCurrentTrack = { ...state.currentTrack, colors };
      }

      return {
        tracks: updatedTracks,
        currentTrack: updatedCurrentTrack
      };
    });
  },
}));
