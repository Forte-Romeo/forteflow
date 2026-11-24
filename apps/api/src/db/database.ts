import { pool } from './pool.js';

/**
 * Verifies that PostgreSQL is reachable.
 */
export async function checkDatabaseConnection(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}

/**
 * Closes all connections in the PostgreSQL pool.
 */
export async function closeDatabaseConnection(): Promise<void> {
  await pool.end();
}
