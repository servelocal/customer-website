'use client';
import Button from '@/components/Button';
import Link from 'next/link';
import styles from './page.module.css';
import Icons from '@/lib/icons';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>Play with your components</h1>
      <div className={styles.buttonsContainer}>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Link href="/notFoundExmple">
          <Button>Not Found</Button>
        </Link>

        <Button variant="primary" icon={<Icons.Home />} iconPosition="left">
          Icon Left
        </Button>
        <Button variant="primary" icon={<Icons.Home />} iconPosition="right">
          Icon Right
        </Button>

        <Button
          variant="primary"
          icon={<Icons.Close />}
          ariaLabel="close"
        ></Button>
        <Link href="/notFoundExmple">
          <Button>Not Found</Button>
        </Link>
      </div>
    </main>
  );
}
