import { Pool } from 'pg';

// Create a connection pool to PostgreSQL
const db = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT) || 5432, // default port
});

export default db;
