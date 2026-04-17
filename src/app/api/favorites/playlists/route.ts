import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    const { playlistId } = await request.json();
    if (!playlistId) return new NextResponse('Missing playlistId', { status: 400 });

    const existing = await prisma.favoritePlaylist.findUnique({
      where: {
        userId_playlistId: {
          userId: session.user.id,
          playlistId: playlistId
        }
      }
    });

    if (existing) {
      try {
        await prisma.favoritePlaylist.delete({ where: { id: existing.id } });
      } catch (e: any) {
        if (e.code !== 'P2025') throw e;
      }
      return NextResponse.json({ isFavorite: false });
    } else {
      try {
        await prisma.favoritePlaylist.create({
          data: {
            userId: session.user.id,
            playlistId: playlistId
          }
        });
      } catch (e: any) {
        if (e.code !== 'P2002') throw e;
      }
      return NextResponse.json({ isFavorite: true });
    }
  } catch (error) {
    console.error('Favorite Playlist POST error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    const favorites = await prisma.favoritePlaylist.findMany({
      where: { userId: session.user.id },
      include: { playlist: { include: { tracks: { include: { track: true } } } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      playlists: favorites.map(f => f.playlist)
    });
  } catch (error) {
    console.error('Favorite Playlist GET error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
