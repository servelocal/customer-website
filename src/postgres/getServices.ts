import db from '@/lib/db';

type Service = {
  service_id: number;
  service_name: string;
};

export default async function getServices(): Promise<Service[] | void> {
  try {
    const data = await db.query<Service>(
      `SELECT service_id, service_name FROM services`
    );
    return data.rows;
  } catch (err) {
    console.error('Error while fetching services:', err);
  }
}
