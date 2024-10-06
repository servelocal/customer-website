import Button from '@/components/Button';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>Playground</h1>

      <br></br>

      <div>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
      </div>

      <br></br>

      <div>
        <h2>Fetching services from server component </h2>
      </div>
    </main>
  );
}
