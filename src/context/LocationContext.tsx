'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Utility Functions for Cookies
const getCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

const setCookie = (
  name: string,
  value: string,
  options: { path?: string; maxAge?: number } = {}
) => {
  const { path = '/', maxAge } = options;
  let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}`;
  if (maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }
  document.cookie = cookieString;
};

// Location Context Types
interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
}

// Create Context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

const CookieConsentBanner = ({ onConsent }: { onConsent: (consent: boolean) => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-black p-4 text-white">
      <p className="text-sm">
        We use cookies to improve your experience. Do you consent to the use of cookies?
      </p>
      <div>
        <button className="mr-2 rounded-md px-4 py-2 text-white" onClick={() => onConsent(false)}>
          Decline
        </button>
        <button
          className="rounded-md bg-white px-4 py-2 text-black"
          onClick={() => onConsent(true)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

// Location Provider
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState('United Kingdom');
  const [hasConsented, setHasConsented] = useState(() => getCookie('cookie-consent') === 'true');
  const [showBanner, setShowBanner] = useState(() => !getCookie('cookie-consent'));

  const setLocation = (newLocation: string) => {
    if (hasConsented) {
      setCookie('location', newLocation, { maxAge: 365 * 24 * 60 * 60 }); // 1 year expiry
    }
    setLocationState(newLocation);
  };

  const handleConsent = (consent: boolean) => {
    setCookie('cookie-consent', consent.toString(), { maxAge: 365 * 24 * 60 * 60 });
    setHasConsented(consent);
    setShowBanner(false);
  };

  useEffect(() => {
    if (hasConsented) {
      const savedLocation = getCookie('location');
      if (savedLocation) {
        setLocationState(savedLocation);
      }
    }
  }, [hasConsented]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
      {showBanner && <CookieConsentBanner onConsent={handleConsent} />}
    </LocationContext.Provider>
  );
};

// Hook for Context
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
