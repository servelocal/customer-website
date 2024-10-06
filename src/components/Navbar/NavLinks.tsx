import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

interface NavLink {
  name: string;
  href: string;
}

export default function NavLinks({ name, href }: NavLink) {
  const pathname = usePathname();
  return (
    <li>
      <Link className={pathname === href ? styles.active : ''} href={href}>
        {name}
      </Link>
    </li>
  );
}
