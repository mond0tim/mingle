import { prisma } from "../src/lib/db";

async function safeMigrate() {
  console.log("🚀 Starting safe migration for Track IDs (String -> Int)...");

  try {
    // 1. Проверяем, остались ли не-числовые ID
    const badTracks = await prisma.$queryRawUnsafe<{ id: string }[]>(
      "SELECT id FROM track WHERE id REGEXP '^[^0-9]+$'"
    );

    if (badTracks.length > 0) {
      console.error("❌ Aborting: Found non-numeric IDs in 'track' table:", badTracks);
      return;
    }

    console.log("✅ All IDs are numeric. Proceeding to ALTER tables...");

    // 2. Выполняем серию ALTER TABLE
    // В MariaDB/MySQL это нужно делать аккуратно
    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");

    console.log("- Modifying track_history...");
    await prisma.$executeRawUnsafe("ALTER TABLE track_history MODIFY trackId INT NOT NULL;");

    console.log("- Modifying favorite_track...");
    await prisma.$executeRawUnsafe("ALTER TABLE favorite_track MODIFY trackId INT NOT NULL;");

    console.log("- Modifying playlist_track...");
    await prisma.$executeRawUnsafe("ALTER TABLE playlist_track MODIFY trackId INT NOT NULL;");

    console.log("- Modifying user metadata...");
    await prisma.$executeRawUnsafe("ALTER TABLE user MODIFY lastPlayedTrackId INT NULL;");

    console.log("- Final step: Modifying track id and enabling AUTO_INCREMENT...");
    await prisma.$executeRawUnsafe("ALTER TABLE track MODIFY id INT NOT NULL AUTO_INCREMENT;");

    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");

    console.log("🎉 SUCCESS! All Track IDs successfully converted to INT.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
  } finally {
    process.exit();
  }
}

safeMigrate();
