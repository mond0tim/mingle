import { prisma } from '../src/lib/db';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function check() {
  console.log('--- DB CONNECTION TEST ---');
  try {
    const start = Date.now();
    const trackCount = await prisma.track.count();
    const playlistCount = await prisma.playlist.count();
    const end = Date.now();
    
    console.log(`Tracks: ${trackCount}`);
    console.log(`Playlists: ${playlistCount}`);
    console.log(`Response time: ${end - start}ms`);
    
    const sample = await prisma.track.findMany({ take: 5, select: { id: true, title: true } });
    console.log('Sample Track IDs:', sample.map(t => t.id));
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

check().finally(() => prisma.$disconnect());
