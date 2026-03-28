import * as fs from 'fs';
import * as path from 'path';
import { Track, Playlist } from '@/types';
import { initialTracks } from '@/data/data';

export type VibeType = 'hour' | 'day' | 'week' | 'month';

const vibeCovers: Record<VibeType, string> = {
  hour: '/covers/playlists/vibe.png',
  day: '/covers/playlists/vibe-day.jpg',
  week: '/covers/playlists/vibe-week.jpg',
  month: '/covers/playlists/vibe-month.jpg',
};

const vibeIds: Record<VibeType, number> = {
  hour: 600,
  day: 240,
  week: 700,
  month: 300,
};

const vibeTitles: Record<VibeType, string> = {
  hour: 'вайб',
  day: 'вайб дня',
  week: 'вайб недели',
  month: 'вайб месяца',
};

const vibeInfoPath = path.join(process.cwd(), 'public', 'vibeInfo.json');

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTrackCount(type: VibeType): number {
  switch (type) {
    case 'hour': return getRandomInt(10, 20);
    case 'day': return getRandomInt(20, 30);
    case 'week': return getRandomInt(30, 40);
    case 'month': return getRandomInt(40, 60);
    default: return 10;
  }
}

function generateVibePlaylist(type: VibeType, allTracks: Track[]): Playlist & { updatedAt: string } {
  const count = getTrackCount(type);
  const shuffled = shuffleArray(allTracks);
  return {
    id: vibeIds[type],
    title: vibeTitles[type],
    cover: vibeCovers[type],
    tracks: shuffled.slice(0, count),
    isPlaying: false,
    category: 'vibe',
    type: 'playlist',
    updatedAt: new Date().toISOString(),
  };
}

export function generateAllVibePlaylists(): (Playlist & { updatedAt: string })[] {
  return (['hour', 'day', 'week', 'month'] as VibeType[]).map(type =>
    generateVibePlaylist(type, initialTracks)
  );
}

export function saveVibePlaylistsToFile(playlists: Playlist[]) {
  fs.writeFileSync(vibeInfoPath, JSON.stringify(playlists, null, 2), 'utf-8');
}

export function loadVibePlaylistsFromFile(): Playlist[] {
  if (!fs.existsSync(vibeInfoPath)) return [];
  const raw = fs.readFileSync(vibeInfoPath, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}