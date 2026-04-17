import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    const { trackId } = await request.json();
    if (!trackId) return new NextResponse('Missing trackId', { status: 400 });

    // Проверяем, в избранном ли
    const trackIdStr = String(trackId);
    const existing = await prisma.favoriteTrack.findUnique({
      where: {
        userId_trackId: {
          userId: session.user.id,
          trackId: trackIdStr
        }
      }
    });

    if (existing) {
      try {
        await prisma.favoriteTrack.delete({
          where: { id: existing.id }
        });
      } catch (e: any) {
        if (e.code !== 'P2025') throw e; 
        // Если уже удалено - ок
      }
      return NextResponse.json({ isFavorite: false });
    } else {
      try {
        await prisma.favoriteTrack.create({
          data: {
            userId: session.user.id,
            trackId: trackIdStr
          }
        });
      } catch (e: any) {
        if (e.code !== 'P2002') throw e;
        // Если уже создано - ок
      }
      return NextResponse.json({ isFavorite: true });
    }
  } catch (error) {
    console.error('Favorites POST error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

    const favorites = await prisma.favoriteTrack.findMany({
      where: { userId: session.user.id },
      include: { track: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      tracks: favorites.map(f => f.track)
    });
  } catch (error) {
    console.error('Favorites GET error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
