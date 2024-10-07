import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <h1>This is the Home page</h1>
        <Link href="/playground">Go to playground 🤜</Link>
      </main>
    </div>
  );
}
