import * as mariadb from 'mariadb';
import 'dotenv/config';

async function checkIds() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        family: 4,
        connectTimeout: 60000
    };
    const conn = await mariadb.createConnection(config);
    const rows = await conn.query("SELECT id FROM track");
    console.log(JSON.stringify(rows));
    await conn.end();
    process.exit();
}
checkIds();
