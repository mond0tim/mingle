import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const user = session?.user;

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { trackId: trackIdRaw, playlistId, listenedSec } = await request.json();
    const trackId = typeof trackIdRaw === "string" ? parseInt(trackIdRaw, 10) : trackIdRaw;

    if (!trackId || isNaN(trackId)) {
      return new NextResponse('Missing or invalid trackId', { status: 400 });
    }

    // 1. Запись истории прослушивания трека
    await prisma.trackHistory.create({
      data: {
        userId: user.id,
        trackId: trackId,
        listenedSec: listenedSec || 0,
      }
    });

    // 2. Проверяем существование плейлиста в базе (чтобы не нарушать Foreign Key для Vibe плейлистов типа "600")
    const playlistIdStr = playlistId ? String(playlistId) : undefined;
    let dbPlaylistId: string | undefined = undefined;

    if (playlistIdStr) {
      const exists = await prisma.playlist.findUnique({
        where: { id: playlistIdStr }
      });
      if (exists) dbPlaylistId = playlistIdStr;
    }

    if (dbPlaylistId) {
      // Ищем последнюю запись по этому плейлисту за последние 5 минут, чтобы не спамить
      const recentPlaylistHist = await prisma.playlistHistory.findFirst({
        where: {
          userId: user.id,
          playlistId: dbPlaylistId,
          playedAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }
        }
      });

      if (!recentPlaylistHist) {
        await prisma.playlistHistory.create({
          data: {
            userId: user.id,
            playlistId: dbPlaylistId,
          }
        });
      }
    }

    // 3. Обновляем метаданные пользователя
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastPlayedTrackId: trackId,
        lastPlayedPlaylistId: dbPlaylistId,
        totalPlayTime: { increment: listenedSec || 0 },
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('History Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    const user = session?.user;

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Получаем последние треки (уникальные)
    const rawTrackHistory = await prisma.trackHistory.findMany({
      where: { userId: user.id },
      orderBy: { playedAt: 'desc' },
      include: { track: true },
      take: 50,
    });
    
    const seenTracks = new Set<number>();
    const recentTracks: any[] = [];
    for (const entry of rawTrackHistory) {
      if (!seenTracks.has(entry.track.id)) {
        seenTracks.add(entry.track.id);
        recentTracks.push(entry.track);
      }
      if (recentTracks.length >= 20) break;
    }

    // Получаем последние плейлисты (уникальные)
    const rawPlaylistHistory = await prisma.playlistHistory.findMany({
      where: { userId: user.id },
      orderBy: { playedAt: 'desc' },
      include: { playlist: true },
      take: 30,
    });

    const seenPlaylists = new Set<string>();
    const recentPlaylists: any[] = [];
    for (const entry of rawPlaylistHistory) {
      if (entry.playlist && !seenPlaylists.has(entry.playlist.id)) {
        seenPlaylists.add(entry.playlist.id);
        recentPlaylists.push(entry.playlist);
      }
      if (recentPlaylists.length >= 10) break;
    }

    return NextResponse.json({
      recentTracks,
      recentPlaylists
    });
  } catch (error) {
    console.error('History GET Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
