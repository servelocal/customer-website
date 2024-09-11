import Button from '@components/Button';

export default function Home() {
  return (
    <main>
      <div>
        <Button $variant="primary">Primary</Button>
        <Button $variant="secondary">Secondary</Button>
        <Button $variant="success">Success</Button>
        <Button $variant="danger">Danger</Button>
        <Button $variant="warning">Warning</Button>
      </div>
    </main>
  );
}
