// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbConfig = {
  host: process.env.DB_HOST || '108.165.32.191',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'j82717825_mingle',
  password: process.env.DB_PASSWORD || 'asmcs~Gr3Mqp',
  database: process.env.DB_NAME || 'j82717825_mngl',
  family: 4,
};

const adapter = new PrismaMariaDb(dbConfig);
const prisma = new PrismaClient({ adapter });

async function main() {
  const userId = 'sHHWLKC6qq3n67JGBgtBH4NrJhJzBpNJ';
  console.log('Checking user:', userId);

  try {
    const user = await (prisma as any).user.findUnique({
      where: { id: userId }
    });
    console.log('User found:', JSON.stringify(user, null, 2));
  } catch (e) {
    console.error('Error fetching user:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
