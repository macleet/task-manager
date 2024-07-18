import 'dotenv/config'
import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    password: process.env.POSTGRES_PASS,
    host: 'localhost',
    port: 5432,
    database: 'task_manager_v2'
});

export default pool;