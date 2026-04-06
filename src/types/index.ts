export interface Track {
	id: string | number;
	title: string;
	artist: string;
	src: string;
	cover: string;
	color?: string;
	fullSrc?: string | null;
	type: string;
}

export interface Playlist {
	id: string | number;
	title: string;
	cover: string | null;
	tracks: Track[];
	isPlaying: boolean;
	category: string;
	type: string;
	author?: string | null;
	colors?: any;
	updatedAt?: string;
}

export interface LyricsApiResponse {
	plainLyrics?: string
	syncedLyrics?: string
	message?: string
	error?: string
	code?: number
	name?: string
}