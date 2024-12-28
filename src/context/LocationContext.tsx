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

// Location Provider
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState(() => getCookie('location') || 'United Kingdom');

  const setLocation = (newLocation: string) => {
    setCookie('location', newLocation, { maxAge: 365 * 24 * 60 * 60 }); // 1 year expiry
    setLocationState(newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
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
