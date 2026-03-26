

export interface Track {
	id: number;
	title: string;
	artist: string;
	src: string;
	cover: string;
	color?: string; // не обязательный
	fullSrc: string | 'none';
	type: 'track';
  }
  
  export interface Playlist {
	id: number;
	title: string;
	cover: string;
	tracks: Track[];
	isPlaying: boolean;
	category: 'other' | 'single' | 'album' | 'vibe' | 'playlist' | 'mix';
	type: 'playlist';
	author?: string;
	colors?: {
		button?: string; // Добавляем опциональные поля для цветов
		text?: string;
		icon?: string;
	  };
	updatedAt?: string; // Дата последнего обновления
  }


  export interface LyricsApiResponse {
	plainLyrics?: string
	syncedLyrics?: string
	message?: string
	error?: string
	code?: number
	name?: string
  }