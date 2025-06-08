import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { ReactNode } from 'react';

interface LocationLayoutProps {
  children: ReactNode;
}

export default function LocationLayout({ children }: LocationLayoutProps) {
  return (
    <div>
      <ScrollToTop />
      {children}
    </div>
  );
}
