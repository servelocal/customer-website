'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/city/portsmouth/activities', label: 'Activities' },
  { href: '/events', label: 'Events' },
  { href: '/communities', label: 'Communities' },
  { href: '/restaurants', label: 'Restaurants' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`transition-backdrop fixed left-0 top-0 z-50 w-full transition-colors duration-500 ease-in-out ${
        isScrolled ? 'bg-white/40 backdrop-blur-3xl' : 'bg-transparent'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-10">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            SideQuest
          </Link>
          <div className="hidden space-x-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href ? 'underline' : 'text-black/60 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/sign-in"
          className="rounded-xl bg-black px-4 py-2 text-lg text-white hover:bg-slate-800"
        >
          Sign In
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-gray-700 hover:text-gray-900 focus:outline-none md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="space-y-1 px-2 pb-3 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                pathname === link.href ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
