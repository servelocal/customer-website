import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">ServeLocal</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/playground">Playground</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
