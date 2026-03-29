// src/features/player/services/mediaSessionService.ts
import { usePlayerStore } from '../store/playerStore';

let isInitialized = false;

export const initMediaSessionService = () => {
	if (typeof window === 'undefined' || !('mediaSession' in navigator) || isInitialized) return;
	isInitialized = true;

	const getHowler = () => usePlayerStore.getState().howlerRef.current?.howler;

	// ОБРАБОТЧИКИ ЭКШЕНОВ ОС
	navigator.mediaSession.setActionHandler('play', () => {
		const howler = getHowler();
		if (howler) {
			howler.play();
			usePlayerStore.getState().setPlaying(true);
		}
	});

	navigator.mediaSession.setActionHandler('pause', () => {
		const howler = getHowler();
		if (howler) {
			howler.pause();
			usePlayerStore.getState().setPlaying(false);
		}
	});

	navigator.mediaSession.setActionHandler('previoustrack', () => {
		usePlayerStore.getState().handlePrevTrack();
	});

	navigator.mediaSession.setActionHandler('nexttrack', () => {
		usePlayerStore.getState().handleNextTrack();
	});

	navigator.mediaSession.setActionHandler('seekto', (details) => {
		const howler = getHowler();
		if (howler && details.seekTime !== undefined) {
			howler.seek(details.seekTime);
			usePlayerStore.getState().setSeek(details.seekTime);
			// Обновляем позицию в ОС немедленно после перемотки
			if ('setPositionState' in navigator.mediaSession) {
				navigator.mediaSession.setPositionState({
					duration: howler.duration(),
					playbackRate: 1,
					position: details.seekTime
				});
			}
		}
	});

	// ПОДПИСКА НА ИЗМЕНЕНИЯ STORE
	usePlayerStore.subscribe((state, prevState) => {
		if (!('mediaSession' in navigator)) return;

		// 1. Обновление метаданных только при реальной смене трека
		if (state.currentTrack?.id !== prevState.currentTrack?.id && state.currentTrack) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: state.currentTrack.title,
				artist: state.currentTrack.artist,
				album: state.playlistIsPlaying?.title || '',
				artwork: [{
					src: state.currentTrack.cover || '/placeholder.svg',
					sizes: '512x512',
					type: 'image/png'
				}]
			});
		}

		// 2. Синхронизация статуса (Playing/Paused)
		if (state.playing !== prevState.playing) {
			navigator.mediaSession.playbackState = state.playing ? 'playing' : 'paused';
		}
	});
};