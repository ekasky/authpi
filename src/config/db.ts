import { Pool } from 'pg';
import env from './env';

const pool = new Pool({

    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: env.DB_PORT

});

export const testDatabaseConnection = async (): Promise<void> => {

    try {

        await pool.query('SELECT 1');
        console.log('PostgreSQL connected successfully');

    } catch(error: any) {
        throw new Error(`Database connection failed: ${error.message}`);
    }

};

export default pool;