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
    (async () => {
      try {
        const { getLocation, getCoords } = await getLocationCookie();
        if (getLocation) setLocationState(getLocation);
        if (getCoords) {
          const parsedCoords = JSON.parse(getCoords);
          if (parsedCoords.latitude && parsedCoords.longitude) {
            setCoords(parsedCoords);
          }
        }
      } catch (error) {
        console.error('Failed to fetch or parse location data:', error);
      }
    })();
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
