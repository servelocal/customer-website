'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import NavLinks from './NavLinks';
import { LuMenu } from 'react-icons/lu';
import Button from '../Button';

const itemLinks = [
  { name: 'Event', href: '/events' },
  { name: 'Playground', href: '/playground' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.logo} href="/">
          ServeLocal
        </Link>
      </div>

      <Button
        ariaLabel="Navbar toggle"
        className={styles.menuToggle}
        onClick={toggleMenu}
      >
        <span className={styles.icon}>
          <LuMenu />
        </span>
      </Button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {itemLinks.map(({ name, href }) => (
          <NavLinks key={name} name={name} href={href} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
