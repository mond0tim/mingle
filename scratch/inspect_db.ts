import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("--- TRACKS ---");
  const tracks = await prisma.track.findMany({ take: 5, orderBy: { createdAt: 'asc' } });
  console.log(JSON.stringify(tracks, null, 2));

  console.log("\n--- PLAYLISTS ---");
  const playlists = await prisma.playlist.findMany({ take: 5 });
  console.log(JSON.stringify(playlists, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
