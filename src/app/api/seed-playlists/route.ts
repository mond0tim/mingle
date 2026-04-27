import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const all = await prisma.playlist.upsert({
      where: { id: 'all-tracks' },
      update: { title: 'Все треки', cover: '/alltracks.png', type: 'system', category: 'OTHER' },
      create: { id: 'all-tracks', title: 'Все треки', cover: '/alltracks.png', type: 'system', category: 'OTHER', isPublic: true }
    });

    const liked = await prisma.playlist.upsert({
      where: { id: 'liked-tracks' },
      update: { title: 'Нравится', cover: '/liked.png', type: 'system', category: 'OTHER' },
      create: { id: 'liked-tracks', title: 'Нравится', cover: '/liked.png', type: 'system', category: 'OTHER', isPublic: false }
    });

    return NextResponse.json({ success: true, all, liked });
  } catch (error: any) {
    console.error("SEED ERRROR: ", error);
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
