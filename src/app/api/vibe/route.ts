import { NextResponse } from 'next/server';
import {
  generateAllVibePlaylists,
  saveVibePlaylistsToFile,
  loadVibePlaylistsFromFile,
} from '@/utils/vibePlaylists';
import { Playlist } from '@/types';

export async function GET() {
  let playlists = loadVibePlaylistsFromFile();
  let changed = false;

  if (!playlists || playlists.length === 0) {
    playlists = generateAllVibePlaylists();
    changed = true;
  } else {
    const allFresh = generateAllVibePlaylists();
    playlists = playlists
      .map((pl: Playlist) => {
        let type: 'hour' | 'day' | 'week' | 'month' | undefined;
        if (pl.id === 600) type = 'hour';
        else if (pl.id === 240) type = 'day';
        else if (pl.id === 700) type = 'week';
        else if (pl.id === 300) type = 'month';

        if (type && (!pl.updatedAt || needUpdate(type, pl.updatedAt))) {
          changed = true;
          // Берём новый с актуальным updatedAt и треками
          return allFresh.find(a => a.id === pl.id);
        }
        return pl;
      })
      .filter((pl): pl is Playlist => pl !== undefined);
  }

  if (changed) {
    saveVibePlaylistsToFile(playlists);
  }

  return NextResponse.json(playlists);
}

// POST — пересоздать вайб-плейлисты и сохранить их
export async function POST() {
  const playlists = generateAllVibePlaylists();
  saveVibePlaylistsToFile(playlists);
  return NextResponse.json(playlists);
}

// Вспомогательная функция для проверки времени обновления
function needUpdate(type: 'hour' | 'day' | 'week' | 'month', updatedAt: string): boolean {
  const now = Date.now();
  const updated = new Date(updatedAt).getTime();
  switch (type) {
    case 'hour': return now - updated > 60 * 60 * 1000; // 1 час
    case 'day': return now - updated > 24 * 60 * 60 * 1000; // 1 день
    case 'week': return now - updated > 7 * 24 * 60 * 60 * 1000; // 1 неделя
    case 'month': return now - updated > 30 * 24 * 60 * 60 * 1000; // 1 месяц
    default: return true;
  }
}