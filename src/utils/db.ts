import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'serverlocal',
  password: process.env.PG_PASSWORD || 'newpassword',
  port: Number(process.env.PG_PORT) || 5433,
  application_name: 'nextjs-app',
});

// Helper to set the search_path for each connection
pool.on('connect', (client) => {
  client
    .query('SET search_path TO servelocal;')
    .then(() => console.log('Search path set to servelocal'))
    .catch((err) => console.error('Error setting search path:', err));
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
};
