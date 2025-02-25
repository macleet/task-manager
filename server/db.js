import 'dotenv/config';
import fs from 'fs';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const isDevelopment = process.env.DEVELOPMENT === "true";

const pool = new pg.Pool({
    connectionString: isDevelopment
        ? process.env.LOCALDB_URL
        : process.env.DATABASE_URL
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
