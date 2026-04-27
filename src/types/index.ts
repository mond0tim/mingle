export interface ExtractedColors {
  dominant: string;
  accent: string;
  vibrant?: string;
  muted?: string;
  darkVibrant?: string;
  darkMuted?: string;
  lightVibrant?: string;
  lightMuted?: string;
  palette?: string[];
  
  // FastAverageColor results
  facetSimple?: string;
  facetSqrt?: string;
  facetDominant?: string;
  vibrantDominant?: string;
  vibrantAccent?: string;
  bindings?: {
    playerPrimary?: { channel?: string; manual?: string; adjust?: number };
    playerSecondary?: { channel?: string; manual?: string; adjust?: number };
    visualizerStart?: { channel?: string; manual?: string; adjust?: number };
    visualizerMid?: { channel?: string; manual?: string; adjust?: number };
    visualizerEnd?: { channel?: string; manual?: string; adjust?: number };
  };

  // Playlist specific
  background?: string;
  title?: string;
  button?: string;
  icon?: string;
  [key: string]: any;
}

export interface Track {
	id: number;
	title: string;
	artist: string;
	src: string;
	cover: string;
	color?: string;
  colors?: ExtractedColors | null;
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
	colors?: ExtractedColors | null;
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