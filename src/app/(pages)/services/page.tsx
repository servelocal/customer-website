'use client';
import Button from '@/components/Button';
import Link from 'next/link';
import styles from './page.module.scss';

export default function ServicesPage() {
  return (
    <main>
      <h1>Services</h1>
      <div className={styles.buttonsContainer}>
        <Link href="/events">
          <Button variant="secondary">Events</Button>
        </Link>
      </div>
    </main>
  );
}
