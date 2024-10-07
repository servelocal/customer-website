import { prisma } from '@/lib/prisma';

interface Event {
  event_id: number;
  name: string;
}
export default async function EventLists() {
  const events: Event[] = await prisma.events.findMany();

  return (
    <div>
      {events.map(({ event_id, name }) => (
        <p key={event_id}>{name}</p>
      ))}
    </div>
  );
}
