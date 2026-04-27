import { PrismaClient } from '../src/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log("📦 Starting backup of tracks and playlists...");
  
  const tracks = await prisma.track.findMany();
  const playlists = await prisma.playlist.findMany();
  const playlistTracks = await prisma.playlistTrack.findMany();
  
  const backup = {
    tracks,
    playlists,
    playlistTracks,
    timestamp: new Date().toISOString()
  };

  const backupPath = path.join(process.cwd(), 'scratch', 'db_backup_before_int_migration.json');
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  
  console.log(`✅ Backup saved to ${backupPath}`);
  console.log(`📊 Statistics: ${tracks.length} tracks, ${playlists.length} playlists.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
