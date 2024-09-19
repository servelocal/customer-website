import Button from '@/components/Button';
import ServiceList from '@/components/ServiceList';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>Playground</h1>

      <br></br>

      <div>
        <h2>Button componenets</h2>
        <Button $variant="primary">Primary</Button>
        <Button $variant="secondary">Secondary</Button>
        <Button $variant="success">Success</Button>
        <Button $variant="danger">Danger</Button>
        <Button $variant="warning">Warning</Button>
      </div>

      <br></br>

      <div>
        <h2>Fetching services from server component </h2>
        <ServiceList />
      </div>
    </main>
  );
}
