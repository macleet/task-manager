import 'dotenv/config';
import fs from 'fs';
import pg from 'pg';
import path from 'path';

const pool = new pg.Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

async function initializeDb() {
    try {
        await pool.connect();  // Ensure we are connected to the database
        console.log('Connected to the database');

        // Run the schema SQL to create the tables
        await pool.query(schemaSql);
        console.log('Database schema created successfully');
    } catch (err) {
        console.error('Error running schema.sql', err);
    }
}
  
initializeDb().catch((err) => console.error(err));

export default pool;
