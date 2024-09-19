import db from '@/lib/db';
import { PoolClient } from 'pg';

import { faker } from '@faker-js/faker';

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

async function seedServices(client: PoolClient) {
  try {
    const services = Array.from({ length: 10 }).map(() => ({
      serviceName: faker.person.jobTitle(),
    }));

    await Promise.all(
      services.map(({ serviceName }) =>
        client.query(
          `INSERT INTO services (service_name)
                    VALUES ($1)
                    `,
          [serviceName]
        )
      )
    );

    console.log('Service table has bee succesfully seeded🌱');
  } catch (err) {
    console.error('Error while seeding: ', err);
    throw err;
  }
}

export async function GET() {
  const client = await db.connect();

  try {
    await createServicesTable(client);
    await seedServices(client);

    return Response.json({ message: 'Database created successfully' });
  } catch (err) {
    return Response.json({ err });
  } finally {
    await client.release();
    console.log('databse is closed');
  }
}
