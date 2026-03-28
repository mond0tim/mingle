import { create } from 'zustand';
import type ReactHowler from 'react-howler';
import type { Track, Playlist } from '@/types';
import React from 'react';

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

  // Actions
  playTrack: (track: Track, playlist?: Playlist, autoplay?: boolean) => void;
  playPlaylist: (playlist: Playlist, track?: Track) => void;
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

  // Refs for audio player control
  howlerRef: React.RefObject<ReactHowler>;
  setHowlerRef: (ref: React.RefObject<ReactHowler>) => void;
  audioContext: React.RefObject<AudioContext>;
  setAudioContext: (ref: React.RefObject<AudioContext>) => void;
  audioNode: React.RefObject<MediaElementAudioSourceNode>;
  setAudioNode: (ref: React.RefObject<MediaElementAudioSourceNode>) => void;
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
  howlerRef: React.createRef<ReactHowler>(),
  audioContext: React.createRef<AudioContext>(),
  audioNode: React.createRef<MediaElementAudioSourceNode>(),

  setHowlerRef: (ref) => set({ howlerRef: ref }),
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
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  playTrack: (track, playlist, autoplay = true) => {
    const { howlerRef } = get();
    console.log(`playTrack: Выбран трек "${track.title}"`);
    
    if (howlerRef?.current) {
      console.log('playTrack: Остановка текущего трека');
      howlerRef.current.stop();
    }
    
    set((state) => ({
      currentTrack: track,
      playlistIsPlaying: playlist || state.playlistIsPlaying,
      tracks: playlist ? playlist.tracks : state.tracks,
      playing: autoplay,
    }));
  },

  playPlaylist: (playlist, track) => {
    console.log('playPlaylist: Установка плейлиста');
    if (playlist.tracks.length > 0) {
      const trackToPlay = track ? track : playlist.tracks[0];
      console.log(`playPlaylist: Воспроизведение трека "${trackToPlay.title}"`);
      get().playTrack(trackToPlay, playlist, true);
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
    set((state) => {
      console.log(`togglePlay: Переключение состояния playing на ${!state.playing}`);
      return { playing: !state.playing };
    });
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
    const { howlerRef } = get();
    if (howlerRef?.current) {
      howlerRef.current.seek(time);
    }
    set({ seek: time });
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
