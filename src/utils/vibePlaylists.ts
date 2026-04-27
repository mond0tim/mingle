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

export const vibeIds: Record<VibeType, string> = {
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

export async function generateVibePlaylist(type: VibeType): Promise<Playlist & { updatedAt: string }> {
  const allTracks = await prisma.track.findMany();
  const count = getTrackCount(type);
  const shuffled = shuffleArray(allTracks as any[]);
  const selectedTracks = shuffled.slice(0, count);
  const playlistId = vibeIds[type];
  
  // Upsert playlist completely in DB to allow relationships (FavoritePlaylist, etc.)
  await prisma.playlist.upsert({
    where: { id: playlistId },
    update: { updatedAt: new Date(), cover: vibeCovers[type], title: vibeTitles[type] },
    create: {
      id: playlistId,
      title: vibeTitles[type],
      category: 'VIBE',
      type: 'system',
      cover: vibeCovers[type],
    }
  });

  // Re-link tracks using robust sequential ops instead of strict transaction
  // which can timeout across concurrent Next.js serverless workers
  try {
    await prisma.playlistTrack.deleteMany({ where: { playlistId } });
    if (selectedTracks.length > 0) {
      await prisma.playlistTrack.createMany({
        data: selectedTracks.map((t, index) => ({
          playlistId,
          trackId: t.id,
          order: index
        })),
        skipDuplicates: true // Prevent unique constraint violations from overlapping workers
      });
    }
  } catch (err) {
    console.error("Vibe playlist generation race condition caught (ignoring):", err)
  }

  return {
    id: vibeIds[type],
    title: vibeTitles[type],
    cover: vibeCovers[type],
    tracks: selectedTracks.map((t: any) => ({
      ...t,
      type: t.type || 'track'
    })),
    isPlaying: false,
    category: 'vibe',
    type: 'playlist',
    updatedAt: new Date().toISOString(),
  };
}

let generatePromise: Promise<any> | null = null;

export async function generateAllVibePlaylists(): Promise<(Playlist & { updatedAt: string })[]> {
  if (generatePromise) {
    return generatePromise;
  }

  generatePromise = (async () => {
    const types: VibeType[] = ['hour', 'day', 'week', 'month'];
    // Запускаем последовательно, чтобы снизить нагрузку на БД
    const results = [];
    for (const type of types) {
      results.push(await generateVibePlaylist(type));
    }
    return results;
  })();

  try {
    return await generatePromise;
  } finally {
    generatePromise = null;
  }
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