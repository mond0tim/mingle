import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1000,
    });
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Failed to fetch songs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}