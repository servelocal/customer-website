import Link from 'next/link';
import styles from './page.module.scss';
import { prisma } from '@/lib/prisma';

interface Event {
  event_id: number; // Use 'number' instead of 'Integer'
  name: string; // Use 'string' instead of 'String'
}
export default async function Home() {
  const events: Event[] = await prisma.events.findMany();

  return (
    <div className={styles.page}>
      <main>
        <h1>This is the Home page</h1>
        <Link href="/playground">Go to playground 🤜</Link>

        {events.map(({ event_id, name }) => (
          <p key={event_id}>{name}</p>
        ))}
      </main>
    </div>
  );
}
