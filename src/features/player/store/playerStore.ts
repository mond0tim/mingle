import { create } from 'zustand';

import type { Track, Playlist } from '@/types';
import React from 'react';
import { Howl, Howler } from 'howler';

interface PlayerState {
  currentTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  howlerState: string;
  isQueueDrawerOpen: boolean;
  isLyricsDrawerOpen: boolean;
  playlistIsPlaying: Playlist | null;
  tracks: Track[];
  isMuted: boolean;
  volume: number;
  initialPlaylists: Playlist[];
  isGlobalSeeking: boolean;

  // Actions
  playTrack: (track: Track, playlist?: Playlist, autoplay?: boolean) => void;
  playPlaylist: (playlist: Playlist, track?: Track, autoplay?: boolean) => void;
  togglePlay: () => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  handleOnEnd: () => void;
  handleSeek: (time: number) => void;
  setCurrentTrack: (track: Track | null) => void;
  setPlaying: (playing: boolean) => void;
  setDuration: (duration: number) => void;
  setSeek: (seek: number) => void;
  setTracks: (tracks: Track[]) => void;
  setHowlerState: (state: string) => void;
  setIsQueueDrawerOpen: (isOpen: boolean) => void;
  setIsLyricsDrawerOpen: (isOpen: boolean) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setInitialPlaylists: (playlists: Playlist[]) => void;
  setIsGlobalSeeking: (isSeeking: boolean) => void;

  // Refs for audio player control
  howlerInstance: Howl | null;
  setHowlerInstance: (instance: Howl | null) => void;
  audioContext: React.RefObject<AudioContext | null>;
  setAudioContext: (ref: React.RefObject<AudioContext | null>) => void;
  audioNode: React.RefObject<MediaElementAudioSourceNode | null>;
  setAudioNode: (ref: React.RefObject<MediaElementAudioSourceNode | null>) => void;
}

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
  setTracks: (tracks) => set({ tracks }),
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
    const { howlerInstance, setDuration, volume } = get();
    console.log(`playTrack: Выбран трек "${track.title}"`);
    
    // САМОВОССТАНОВЛЕНИЕ КОНТЕКСТА: Разблокируем Web Audio API при первом же клике
    if (typeof Howler !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
        try { Howler.ctx.resume(); } catch (e) {}
    }

    if (howlerInstance) {
      console.log('playTrack: Остановка текущего трека');
      howlerInstance.stop();
      howlerInstance.unload();
    }
    
    const newHowler = new Howl({
      src: [track.src],
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
      onloaderror: (id, err) => console.error("Howler load error:", id, err),
      onplayerror: (id, err) => console.error("Howler play error:", id, err),
    });

    set((state) => ({
      howlerInstance: newHowler,
      currentTrack: track,
      playlistIsPlaying: playlist || state.playlistIsPlaying,
      tracks: playlist ? playlist.tracks : state.tracks,
      playing: autoplay,
    }));

    if (autoplay) {
      newHowler.play();
    }
  },

  playPlaylist: (playlist, track, autoplay = true) => {
    console.log('playPlaylist: Установка плейлиста');
    if (playlist.tracks.length > 0) {
      const trackToPlay = track ? track : playlist.tracks[0];
      console.log(`playPlaylist: Воспроизведение трека "${trackToPlay.title}"`);
      get().playTrack(trackToPlay, playlist, autoplay);
    } else {
      console.log('playPlaylist: Плейлист пуст, остановка воспроизведения');
      set({ 
        playlistIsPlaying: playlist,
        tracks: playlist.tracks,
        playing: false,
      });
    }
  },

  togglePlay: () => {
    const { howlerInstance, playing } = get();
    console.log(`togglePlay: Переключение состояния playing на ${!playing}`);
    
    if (!playing && typeof Howler !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
        try { Howler.ctx.resume(); } catch (e) {}
    }

    if (howlerInstance) {
      if (playing) {
        howlerInstance.pause();
      } else {
        howlerInstance.play();
      }
    }

    set({ playing: !playing });
  },

  handleNextTrack: () => {
    const { currentTrack, tracks, playlistIsPlaying, playTrack } = get();
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
      console.log(`handleNextTrack: Переход от трека ${currentTrackIndex} к ${nextTrackIndex}`);
      playTrack(tracks[nextTrackIndex], playlistIsPlaying ?? undefined);
    }
  },

  handlePrevTrack: () => {
    const { currentTrack, tracks, playlistIsPlaying, playTrack } = get();
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const prevTrackIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      console.log(`handlePrevTrack: Переход от трека ${currentTrackIndex} к ${prevTrackIndex}`);
      playTrack(tracks[prevTrackIndex], playlistIsPlaying ?? undefined);
    }
  },

  handleSeek: (time: number) => {
    const { howlerInstance, duration } = get();
    if (howlerInstance) {
      howlerInstance.seek(time);
    }
    set({ seek: time });

    // Синхронизируем интерфейс ОС (Media Session) со встроенным плеером
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
    const { currentTrack, tracks, playlistIsPlaying, playTrack, setPlaying } = get();
    console.log('handleOnEnd: Текущий трек завершён');
    if (currentTrack && tracks.length) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      if (currentTrackIndex < tracks.length - 1) {
        console.log(`handleOnEnd: Переход к следующему треку: ${currentTrackIndex + 1}`);
        playTrack(tracks[currentTrackIndex + 1], playlistIsPlaying ?? undefined);
      } else {
        if (playlistIsPlaying) {
          console.log('handleOnEnd: Воспроизведение с начала плейлиста');
          playTrack(playlistIsPlaying.tracks[0], playlistIsPlaying);
        } else {
          console.log('handleOnEnd: Нет следующего трека, остановка воспроизведения');
          setPlaying(false);
        }
      }
    } else {
      console.log('handleOnEnd: Нет трека, остановка воспроизведения');
      setPlaying(false);
    }
  },
}));
