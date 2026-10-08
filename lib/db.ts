import { attachDatabasePool } from '@vercel/functions';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

attachDatabasePool(pool);

export { pool };
