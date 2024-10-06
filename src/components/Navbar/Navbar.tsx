'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">ServeLocal</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link
            href="/events"
            className={pathname === '/events' ? styles.active : ''}
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            href="/playground"
            className={pathname === '/playground' ? styles.active : ''}
          >
            Playground
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
