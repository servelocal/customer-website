import db from '@/lib/db';
import { PoolClient } from 'pg';
import { faker } from '@faker-js/faker';

type LogEntry = {
  message: string;
  [key: string]: string; // For additional fields that might be added
};

function addLog(
  logs: LogEntry[],
  message: string,
  data: Record<string, string | number> = {}
) {
  logs.push({ message, ...data });
}

async function createServicesTable(client: PoolClient, logs: LogEntry[]) {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS services(
            service_id SERIAL UNIQUE NOT NUll PRIMARY KEY,
            service_name VARCHAR(50) UNIQUE NOT NULL
            )
        `);
    addLog(logs, '✔ Table created successfully', { table: 'services' });
  } catch (err) {
    addLog(logs, 'Error creating services table', {
      error: (err as Error).message,
    });
    throw err;
  }
}

async function seedServices(client: PoolClient, logs: LogEntry[]) {
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

    addLog(logs, '🌱 Service table seeded successfully', {
      seededCount: services.length,
      table: 'services',
    });
  } catch (err) {
    addLog(logs, 'Error while seeding services table', {
      error: (err as Error).message,
    });
    throw err;
  }
}

export async function GET() {
  const client = await db.connect();
  const logs: LogEntry[] = [];

  try {
    await createServicesTable(client, logs);
    await seedServices(client, logs);

    return Response.json({ message: 'Database created successfully', logs });
  } catch (err) {
    return Response.json({
      message: 'Error has occurred',
      error: (err as Error).message,
      logs,
    });
  } finally {
    await client.release();
    addLog(logs, 'Database connection closed');
  }
}
