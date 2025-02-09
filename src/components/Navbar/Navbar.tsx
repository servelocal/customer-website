'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LocationInput from './LocationInput';
import { useLocation } from '@/context/LocationContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { location } = useLocation();

  const sanitizeLocation = (location: string) => location.toLowerCase().replace(/\s+/g, '-');

  const sanitizedLocation = location ? sanitizeLocation(location) : 'uk';

  const navLinks = [
    { href: `/${sanitizedLocation}/activities`, label: 'Activities' },
    { href: '/events', label: 'Events' },
    { href: '/communities', label: 'Communities' },
    { href: '/restaurants', label: 'Restaurants' },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 z-50 w-full bg-white transition-colors duration-300 ease-in-out`}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-10">
          <Link href="/" className={`text-2xl font-bold`}>
            SideQuest
          </Link>
          <div className="hidden space-x-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href ? 'underline' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LocationInput />
          <Link
            href="/sign-in"
            className="rounded-xl bg-black px-4 py-2 text-lg text-white hover:bg-slate-800"
          >
            Sign In
          </Link>
        </div>
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
        <div className="space-y-1 px-2 pt-2 pb-3 md:hidden">
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
