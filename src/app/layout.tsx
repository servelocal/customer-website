import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import './styles/globals.css';
import Navbar from '@/components/Navbar';
import { LocationProvider } from '@/context/LocationContext';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner/CookieConsentBanner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SideQuest',
  description: 'Activities',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasConsent = cookieStore.has('consent');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}>
        <LocationProvider>
          <Navbar />
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          {children}
          {!hasConsent && <CookieConsentBanner />}
        </LocationProvider>
      </body>
    </html>
  );
}
