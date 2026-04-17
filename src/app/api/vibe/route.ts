import { NextResponse } from 'next/server';
import {
  generateVibePlaylist,
  generateAllVibePlaylists,
  saveVibePlaylistsToFile,
  loadVibePlaylistsFromFile,
  VibeType,
  vibeIds,
} from '@/utils/vibePlaylists';
import { Playlist } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  let playlists = loadVibePlaylistsFromFile();

  // Если кэша нет вообще — генерируем всё с нуля
  if (!playlists || playlists.length === 0) {
    playlists = await generateAllVibePlaylists();
    saveVibePlaylistsToFile(playlists);
    return NextResponse.json(playlists);
  }

  // Проверяем какие плейлисты требуют обновления
  const typesToUpdate: VibeType[] = [];
  for (const pl of playlists) {
    let type: VibeType | undefined;
    if (pl.id === "vibe_hour") type = 'hour';
    else if (pl.id === "vibe_day") type = 'day';
    else if (pl.id === "vibe_week") type = 'week';
    else if (pl.id === "vibe_month") type = 'month';

    if (type && (!(pl as any).updatedAt || needUpdate(type, (pl as any).updatedAt))) {
      typesToUpdate.push(type);
    }
  }

  // Если всё свежее — мгновенно отдаём кэш
  if (typesToUpdate.length === 0) {
    return NextResponse.json(playlists);
  }

  // Генерируем ТОЛЬКО те плейлисты, которые устарели
  for (const type of typesToUpdate) {
    const fresh = await generateVibePlaylist(type);
    const idx = playlists.findIndex((p: any) => p.id === vibeIds[type]);
    if (idx >= 0) playlists[idx] = fresh;
    else playlists.push(fresh);
  }

  saveVibePlaylistsToFile(playlists);
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