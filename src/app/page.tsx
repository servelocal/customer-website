'use client';
import Button from '../components/Button/Button';

export default function Home() {
  return (
    <main>
      <div>
        <Button variant="primary" size="medium">
          Primary Button
        </Button>
        <Button variant="secondary" size="large">
          Secondary Button
        </Button>
        <Button variant="outline" size="small">
          Outline Full-Width Button
        </Button>
        <Button variant="primary" size="medium" disabled>
          Disabled Button
        </Button>
      </div>
    </main>
  );
}
