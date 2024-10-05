'use client';
import Link from 'next/link';
import styles from './styles/notFound.module.scss';
import { usePathname } from 'next/navigation';
import Button from '@/components/Button';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <h1>Oops! Page Not Found</h1>
      <p>
        It looks like the page you&rsquo;re trying to access
        <strong> {pathname}</strong> doesn&rsquo;t exist or has been moved.
      </p>
      <p>
        Don&rsquo;t worry, you can either double-check the URL or use the link
        below to head back to the homepage.
      </p>
      <Link href="/" className={styles.homeLink}>
        <Button variant="primary"> Go Back to Home</Button>
      </Link>
    </div>
  );
}
