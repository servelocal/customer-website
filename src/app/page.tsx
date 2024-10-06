import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const events = await prisma.events.findMany();

  return (
    <main>
      <h1>This is the Home page</h1>
      <Link href="/playground">Go to playground 🤜</Link>

      {events.map(({ event_id, name }) => (
        <p key={event_id}>{name}</p>
      ))}
    </main>
  );
}
