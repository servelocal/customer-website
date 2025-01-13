'use client';

import { getLocationCookie, setLocationCookie } from '@/app/actions/cookie';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { getLocationCookie, setLocationCookie } from '@/actions/locationActions';

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
  coords: { latitude: number; longitude: number };
  setCoords: (coords: { latitude: number; longitude: number }) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<string>('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Fetch the location cookie during hydration
    const fetchLocation = async () => {
      const location = await getLocationCookie(); // Server action
      setLocationState(location);
    };
    fetchLocation();
  }, []);

  const setLocation = async (newLocation: string) => {
    setLocationState(newLocation);
    await setLocationCookie(newLocation); // Update the cookie using server action
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, coords, setCoords }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
