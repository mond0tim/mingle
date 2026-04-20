import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log("Analyzing database structure...");
  
  // Get foreign keys for track and playlist references
  try {
    const fks = await prisma.$queryRaw`
      SELECT 
          TABLE_NAME, 
          COLUMN_NAME, 
          CONSTRAINT_NAME, 
          REFERENCED_TABLE_NAME, 
          REFERENCED_COLUMN_NAME
      FROM
          INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
          REFERENCED_TABLE_SCHEMA = 'j82717825_mngl' 
          AND (REFERENCED_TABLE_NAME = 'track' OR REFERENCED_TABLE_NAME = 'playlist');
    `;
    
    console.log("Foreign Keys found:");
    console.table(fks);
  } catch (e) {
    console.error("Failed to fetch Foreign Keys", e);
  }

  // Get current state of tables
  const tables = ['track', 'playlist', 'playlist_track', 'favorite_track', 'track_history'];
  for (const table of tables) {
    try {
      const columns = await prisma.$queryRawUnsafe(`DESCRIBE ${table}`);
      console.log(`Columns in ${table}:`);
      console.table(columns);
    } catch (e) {
      console.warn(`Could not describe table ${table}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
