'use client';
import { GlobalStyle } from '@/styles/globalStyles';
import { theme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </section>
  );
}
