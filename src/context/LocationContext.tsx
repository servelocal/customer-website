'use client';

import { getLocationCookie, setLocationCookie } from '@/app/actions/cookie';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: string;
  setLocation: (location: string, coords: Coordinates | null) => void;
  coords: Coordinates;
  setCoords: (coords: Coordinates) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<string>('');
  const [coords, setCoords] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Fetch the location cookie during hydration
    const fetchLocation = async () => {
      const { getLocation, getCoords } = await getLocationCookie();
      if (getLocation) {
        setLocationState(getLocation);
      }
    };
    fetchLocation();
  }, []);

  const setLocation = async (newLocation: string, newCoords: Coordinates | null) => {
    setLocationState(newLocation);
    if (newCoords) setCoords(newCoords); // Update coords only if not null
    await setLocationCookie(newLocation, newCoords);
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
