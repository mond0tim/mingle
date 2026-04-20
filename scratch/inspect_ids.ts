import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const tracks = await prisma.track.findMany({ select: { id: true, title: true }, take: 5 });
  const playlists = await prisma.playlist.findMany({ select: { id: true, title: true }, take: 5 });
  
  console.log('--- TRACK IDs ---');
  tracks.forEach(t => console.log(`${t.id} -> ${t.title}`));
  
  console.log('\n--- PLAYLIST IDs ---');
  playlists.forEach(p => console.log(`${p.id} -> ${p.title}`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
