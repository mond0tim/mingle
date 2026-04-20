import * as mariadb from 'mariadb';
import 'dotenv/config';

async function migrate() {
    const config = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        family: 4,
        connectTimeout: 30000
    };

    console.log("🔗 Connecting to MariaDB...");
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        console.log("✅ Connected!");

        console.log("🧐 Checking for non-numeric IDs...");
        const badTracks = await conn.query("SELECT id FROM track WHERE id REGEXP '^[^0-9]+$'");
        if (badTracks.length > 0) {
            console.error("❌ Aborting: Found non-numeric IDs:", badTracks);
            return;
        }

        console.log("🛠 Disabling foreign key checks...");
        await conn.query("SET FOREIGN_KEY_CHECKS = 0");

        console.log("🧹 Handling ID 0 conflict (shifting to 5000)...");
        await conn.query("UPDATE track_history SET trackId = 5000 WHERE trackId = 0");
        await conn.query("UPDATE favorite_track SET trackId = 5000 WHERE trackId = 0");
        await conn.query("UPDATE playlist_track SET trackId = 5000 WHERE trackId = 0");
        await conn.query("UPDATE track SET id = 5000 WHERE id = '0'");

        const steps = [
            // DROP FOREIGN KEYS
            { name: "Drop FK track_history", sql: "ALTER TABLE track_history DROP FOREIGN KEY track_history_trackId_fkey" },
            { name: "Drop FK favorite_track", sql: "ALTER TABLE favorite_track DROP FOREIGN KEY favorite_track_trackId_fkey" },
            { name: "Drop FK playlist_track", sql: "ALTER TABLE playlist_track DROP FOREIGN KEY playlist_track_trackId_fkey" },

            // MODIFY COLUMNS
            { name: "track_history (trackId)", sql: "ALTER TABLE track_history MODIFY trackId INT NOT NULL" },
            { name: "favorite_track (trackId)", sql: "ALTER TABLE favorite_track MODIFY trackId INT NOT NULL" },
            { name: "playlist_track (trackId)", sql: "ALTER TABLE playlist_track MODIFY trackId INT NOT NULL" },
            { name: "user (lastPlayedTrackId)", sql: "ALTER TABLE user MODIFY lastPlayedTrackId INT NULL" },
            { name: "track (id) - Convert to INT and AUTO_INCREMENT", sql: "ALTER TABLE track MODIFY id INT NOT NULL AUTO_INCREMENT" },

            // RE-ADD FOREIGN KEYS
            { name: "Add FK track_history", sql: "ALTER TABLE track_history ADD CONSTRAINT track_history_trackId_fkey FOREIGN KEY (trackId) REFERENCES track(id) ON DELETE CASCADE ON UPDATE CASCADE" },
            { name: "Add FK favorite_track", sql: "ALTER TABLE favorite_track ADD CONSTRAINT favorite_track_trackId_fkey FOREIGN KEY (trackId) REFERENCES track(id) ON DELETE CASCADE ON UPDATE CASCADE" },
            { name: "Add FK playlist_track", sql: "ALTER TABLE playlist_track ADD CONSTRAINT playlist_track_trackId_fkey FOREIGN KEY (trackId) REFERENCES track(id) ON DELETE CASCADE ON UPDATE CASCADE" }
        ];

        for (const step of steps) {
            console.log(`⏳ Executing: ${step.name}...`);
            try {
                await conn.query(step.sql);
                console.log(`✅ ${step.name} done.`);
            } catch (stepErr: any) {
                if (step.name.startsWith("Drop")) {
                    console.warn(`⚠️ Warning: Could not drop FK ${step.name} (maybe already gone). Moving on.`);
                } else {
                    console.error(`❌ Error during step ${step.name}:`, stepErr);
                    throw stepErr; // Re-throw for safety on non-drop steps
                }
            }
        }

        console.log("🔗 Re-enabling foreign key checks...");
        await conn.query("SET FOREIGN_KEY_CHECKS = 1");

        console.log("🎉 SUCCESS! Migration completed.");
    } catch (err) {
        console.error("❌ Error during migration:", err);
    } finally {
        if (conn) await conn.end();
        process.exit();
    }
}

migrate();
