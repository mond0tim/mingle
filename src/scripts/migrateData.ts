import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { initialTracks, initialPlaylists } from '../data/data';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting playlist migration to MySQL...");
  console.log(`Found ${initialPlaylists.length} playlists to migrate.\n`);

  for (const p of initialPlaylists) {
    const playlistId = p.id.toString();
    const existing = await prisma.playlist.findUnique({ where: { id: playlistId } });

    if (existing) {
      console.log(`[SKIP] "${p.title}" (id=${p.id}) already exists.`);
      continue;
    }

    // Маппинг категорий
    const catMap: Record<string, string> = {
      other: 'OTHER', single: 'SINGLE', album: 'ALBUM',
      vibe: 'VIBE', playlist: 'PLAYLIST', mix: 'MIX',
    };

    // 1. Создаём плейлист
    await prisma.playlist.create({
      data: {
        id: playlistId,
        title: p.title,
        cover: p.cover || null,
        type: 'system',
        category: (catMap[p.category] || 'PLAYLIST') as any,
        isPublic: true,
        colors: p.colors ? p.colors : undefined,
      }
    });

    // 2. Собираем уникальные ID треков (без дубликатов)
    const seenTrackIds = new Set<string>();
    const trackLinks: { playlistId: string; trackId: string; order: number }[] = [];
    let order = 0;

    for (const track of p.tracks) {
      const trackId = track.id.toString();
      
      if (seenTrackIds.has(trackId)) continue; // пропускаем дубликаты
      seenTrackIds.add(trackId);

      // Создаём трек если его нет в БД (inline-треки из плейлистов типа 'stud.')
      const trackExists = await prisma.track.findUnique({ where: { id: trackId } });
      if (!trackExists) {
        try {
          await prisma.track.create({
            data: {
              id: trackId,
              title: track.title,
              artist: track.artist,
              src: track.src,
              fullSrc: track.fullSrc === "none" ? null : track.fullSrc,
              cover: track.cover,
              colors: track.color ? [track.color] : undefined,
              type: track.type || "track",
            }
          });
          console.log(`  [NEW TRACK] id=${track.id} "${track.title}"`);
        } catch (err) {
          console.error(`  [ERR] Track id=${track.id}: ${(err as Error).message}`);
          continue;
        }
      }

      trackLinks.push({ playlistId, trackId, order: order++ });
    }

    // 3. Батчевая вставка связей PlaylistTrack (createMany — один SQL запрос!)
    if (trackLinks.length > 0) {
      try {
        await prisma.playlistTrack.createMany({
          data: trackLinks,
          skipDuplicates: true,
        });
      } catch (err) {
        console.error(`  [ERR] Linking tracks to "${p.title}": ${(err as Error).message}`);
      }
    }

    console.log(`[OK] "${p.title}" — ${trackLinks.length} tracks linked.`);
  }

  console.log("\n✅ Playlist migration completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
