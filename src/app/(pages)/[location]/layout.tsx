import { ReactNode } from 'react';

interface LocationLayoutProps {
  children: ReactNode;
}

export default function LocationLayout({ children }: LocationLayoutProps) {
  return <div>{children}</div>;
}
