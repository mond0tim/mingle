// src/features/player/services/mediaSessionService.ts
import { usePlayerStore } from '../store/playerStore';

let isInitialized = false;

export const initMediaSessionService = () => {
	if (typeof window === 'undefined' || !('mediaSession' in navigator) || isInitialized) return;
	isInitialized = true;

	// 1. Статичные обработчики (никогда не меняются)
	const store = usePlayerStore.getState();

	navigator.mediaSession.setActionHandler('play', () => usePlayerStore.getState().setPlaying(true));
	navigator.mediaSession.setActionHandler('pause', () => usePlayerStore.getState().setPlaying(false));
	navigator.mediaSession.setActionHandler('previoustrack', () => usePlayerStore.getState().handlePrevTrack());
	navigator.mediaSession.setActionHandler('nexttrack', () => usePlayerStore.getState().handleNextTrack());
	navigator.mediaSession.setActionHandler('seekto', (details) => {
		if (details.seekTime !== undefined) usePlayerStore.getState().handleSeek(details.seekTime);
	});

	// 2. Следим за изменениями в Store
	usePlayerStore.subscribe((state, prevState) => {
		// Обновляем метаданные при смене трека
		if (state.currentTrack?.id !== prevState.currentTrack?.id) {
			if (state.currentTrack) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: state.currentTrack.title,
					artist: state.currentTrack.artist,
					album: state.playlistIsPlaying?.title || '',
					artwork: [{ src: state.currentTrack.cover || '', sizes: '512x512', type: 'image/png' }]
				});
			}
		}

		// Обновляем состояние проигрывания
		if (state.playing !== prevState.playing) {
			navigator.mediaSession.playbackState = state.playing ? 'playing' : 'paused';
		}

		// Обновляем ползунок времени (важно для того, чтобы ОС не считала плеер "зависшим")
		if (state.duration > 0 && (Math.abs(state.seek - prevState.seek) > 1 || state.duration !== prevState.duration)) {
			try {
				navigator.mediaSession.setPositionState({
					duration: state.duration,
					playbackRate: 1,
					position: Math.min(state.seek, state.duration)
				});
			} catch (e) { }
		}
	});
};