'use client';

import { useEffect, ReactNode } from 'react';
import { useLocation } from '@/context/LocationContext';
import { use } from 'react';

interface LocationLayoutProps {
  children: ReactNode;
  params: Promise<{ location: string }>;
}

export default function LocationLayout({ children, params }: LocationLayoutProps) {
  const { location, setLocation } = useLocation();

  const resolvedParams = use(params);

  useEffect(() => {
    if (resolvedParams.location !== location) {
      setLocation(resolvedParams.location);
    }
  }, [resolvedParams.location, location]);

  return <div>{children}</div>;
}
