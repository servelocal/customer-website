import db from '@/lib/db';
import { PoolClient } from 'pg';
import { faker } from '@faker-js/faker';

type LogEntry = {
  message: string;
  [key: string]: string; // For additional fields that might be added
};

const RECORD_CAP = 10;

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
    // Step 1: Check the current count of services
    const result = await client.query('SELECT COUNT(*) FROM services');
    const currentCount = parseInt(result.rows[0].count, 10);

    // If there are already 10 or more records, no need to seed
    if (currentCount >= RECORD_CAP) {
      addLog(
        logs,
        `🛑 Service table already contains ${RECORD_CAP} or more records, no seeding needed.`,
        {
          currentCount,
          table: 'services',
        }
      );
      return;
    }

    // Step 2: Calculate how many records need to be inserted to reach 10
    const recordsToInsert = RECORD_CAP - currentCount;

    // Step 3: Generate the required number of service names
    const services = Array.from({ length: recordsToInsert }).map(() =>
      faker.person.jobTitle()
    );

    // Step 4: Prepare the query to insert the remaining records
    const values = services
      .map((serviceName) => `('${serviceName}')`)
      .join(',');

    // Step 5: Execute batch insertion if we have records to insert
    await client.query(`
      INSERT INTO services (service_name)
      VALUES ${values}
    `);
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
