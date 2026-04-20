import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const playlists = await prisma.playlist.findMany({
    where: { title: 'Все треки' }
  });
  console.log('--- ALL TRACKS PLAYLISTS ---');
  console.log(JSON.stringify(playlists, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
