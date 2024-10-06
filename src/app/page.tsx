import { prisma } from '@/lib/prisma';
import Button from '@components/Button';

export default async function Home() {
  const events = await prisma.events.findMany();

  return (
    <main>
      <div>
        <Button $variant="primary">Primary</Button>
        <Button $variant="secondary">Secondary</Button>
        <Button $variant="success">Success</Button>
        <Button $variant="danger">Danger</Button>
        <Button $variant="warning">Warning</Button>
      </div>

      {events.map(({ event_id, name }) => (
        <p key={event_id}>{name}</p>
      ))}
    </main>
  );
}
