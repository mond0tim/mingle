import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { 
        queue: true,
        lastPlayedTrackId: true,
        lastPlayedPlaylistId: true
      }
    });

    // Обрабатываем очередь как строку (вручную парсим)
    let queueObj = [];
    if (dbUser?.queue) {
      try {
        queueObj = JSON.parse(dbUser.queue);
      } catch (e) {
        console.error("Queue parse error:", e);
      }
    }

    return NextResponse.json({ 
      queue: queueObj,
      lastPlayedTrackId: dbUser?.lastPlayedTrackId,
      lastPlayedPlaylistId: dbUser?.lastPlayedPlaylistId
    });
  } catch (error) {
    console.error('Queue GET Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { queue, lastPlayedTrackId, lastPlayedPlaylistId } = await request.json();

    await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        // Сериализуем массив в строку для БД если он передан
        ...(queue !== undefined && { queue: JSON.stringify(queue || []) }),
        ...(lastPlayedTrackId !== undefined && { lastPlayedTrackId: lastPlayedTrackId ? Number(lastPlayedTrackId) : null }),
        ...(lastPlayedPlaylistId !== undefined && { lastPlayedPlaylistId: lastPlayedPlaylistId || null }),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Queue PUT Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
