import db from '@/lib/db';

export default async function getServices() {
  try {
    const data = await db.query(
      `SELECT service_id, service_name FROM services`
    );
    return data.rows;
  } catch (err) {
    console.error('Error while fetching services:', err);
  }
}
