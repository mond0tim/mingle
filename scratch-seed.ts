import { PrismaClient } from '@prisma/client';
// Or we just import from the local if tsx resolves it:
import { prisma } from './src/lib/db';

async function main() {
  await prisma.playlist.upsert({
    where: { id: 'all-tracks' },
    update: {
      title: 'Все треки',
      cover: '/alltracks.png',
      type: 'system',
      category: 'PLAYLIST' // enum mapping
    },
    create: {
      id: 'all-tracks',
      title: 'Все треки',
      cover: '/alltracks.png',
      type: 'system',
      category: 'PLAYLIST',
      isPublic: true
    }
  });

  await prisma.playlist.upsert({
    where: { id: 'liked-tracks' },
    update: {
      title: 'Нравится',
      cover: '/liked.png',
      type: 'system',
      category: 'PLAYLIST'
    },
    create: {
      id: 'liked-tracks',
      title: 'Нравится',
      cover: '/liked.png',
      type: 'system',
      category: 'PLAYLIST',
      isPublic: false
    }
  });
  console.log('Successfully seeded system playlists.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
