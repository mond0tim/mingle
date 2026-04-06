import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '@/lib/db';
import { Playlist } from '@/types';

export type VibeType = 'hour' | 'day' | 'week' | 'month';

const vibeCovers: Record<VibeType, string> = {
  hour: '/covers/playlists/vibe.png',
  day: '/covers/playlists/vibe-day.jpg',
  week: '/covers/playlists/vibe-week.jpg',
  month: '/covers/playlists/vibe-month.jpg',
};

const vibeIds: Record<VibeType, string> = {
  hour: "vibe_hour",
  day: "vibe_day",
  week: "vibe_week",
  month: "vibe_month",
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

async function generateVibePlaylist(type: VibeType): Promise<Playlist & { updatedAt: string }> {
  const allTracks = await prisma.track.findMany();
  const count = getTrackCount(type);
  const shuffled = shuffleArray(allTracks as any[]);
  
  return {
    id: vibeIds[type],
    title: vibeTitles[type],
    cover: vibeCovers[type],
    tracks: shuffled.slice(0, count).map((t: any) => ({
      ...t,
      // Убеждаемся что типы соответствуют фронтенду
      type: t.type || 'track'
    })),
    isPlaying: false,
    category: 'vibe',
    type: 'playlist',
    updatedAt: new Date().toISOString(),
  };
}

export async function generateAllVibePlaylists(): Promise<(Playlist & { updatedAt: string })[]> {
  const types: VibeType[] = ['hour', 'day', 'week', 'month'];
  const results = await Promise.all(types.map(type => generateVibePlaylist(type)));
  return results;
}

export function saveVibePlaylistsToFile(playlists: Playlist[]) {
  // Мы всё ещё сохраняем кеш в файл для скорости, но теперь данные из БД
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