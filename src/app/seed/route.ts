import db from '@/lib/db';
import { PoolClient } from 'pg';

async function createServicesTable(client: PoolClient) {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS services(
            service_id SERIAL UNIQUE NOT NUll PRIMARY KEY,
            service_name VARCHAR(50) UNIQUE NOT NULL
            )
        `);
    console.log('"services" table created successfully!');
  } catch (err) {
    console.error('Error createing service table: ', err);
    throw err;
  }
}

export async function GET() {
  const client = await db.connect();
  try {
    await createServicesTable(client);

    return Response.json({ message: 'Database created successfully' });

    // await seedServices()
  } catch (err) {
    return Response.json({ err });
  } finally {
    await client.release();
    console.log('databse is closed');
  }
}
