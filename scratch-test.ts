import { prisma } from './src/lib/db';

async function main() {
  const p1 = await prisma.playlist.findUnique({ where: { id: 'all-tracks' } });
  const p2 = await prisma.playlist.findUnique({ where: { id: 'liked-tracks' } });
  console.log("all-tracks:", p1);
  console.log("liked-tracks:", p2);
  
  const allPlay = await prisma.playlist.findMany({ select: { id: true, title: true } });
  console.log("All playlist IDs:", allPlay);
}
main().finally(() => prisma.$disconnect());
