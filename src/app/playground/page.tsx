import Button from '@/components/Button';
import Link from 'next/link';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>Play with your components</h1>
      <div>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>

        <Link href="/notFoundExmple">
          <Button>Not Found</Button>
        </Link>
      </div>
    </main>
  );
}
