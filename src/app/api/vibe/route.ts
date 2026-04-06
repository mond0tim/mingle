import { NextResponse } from 'next/server';
import {
  generateAllVibePlaylists,
  saveVibePlaylistsToFile,
  loadVibePlaylistsFromFile,
  VibeType
} from '@/utils/vibePlaylists';
import { Playlist } from '@/types';

export async function GET() {
  let playlists = loadVibePlaylistsFromFile();
  let changed = false;

  if (!playlists || playlists.length === 0) {
    playlists = await generateAllVibePlaylists();
    changed = true;
  } else {
    const allFresh = await generateAllVibePlaylists();
    playlists = playlists
      .map((pl: Playlist) => {
        let type: VibeType | undefined;
        if (pl.id === "vibe_hour") type = 'hour';
        else if (pl.id === "vibe_day") type = 'day';
        else if (pl.id === "vibe_week") type = 'week';
        else if (pl.id === "vibe_month") type = 'month';

        // Мы всё равно проверяем время обновления, но из БД
        if (type && (!pl.updatedAt || needUpdate(type, pl.updatedAt))) {
          changed = true;
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

export async function POST() {
  const playlists = await generateAllVibePlaylists();
  saveVibePlaylistsToFile(playlists);
  return NextResponse.json(playlists);
}

function needUpdate(type: VibeType, updatedAt: string): boolean {
  const now = Date.now();
  const updated = new Date(updatedAt).getTime();
  switch (type) {
    case 'hour': return now - updated > 60 * 60 * 1000;
    case 'day': return now - updated > 24 * 60 * 60 * 1000;
    case 'week': return now - updated > 7 * 24 * 60 * 60 * 1000;
    case 'month': return now - updated > 30 * 24 * 60 * 60 * 1000;
    default: return true;
  }
}