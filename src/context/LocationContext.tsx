'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
  coords: { latitude: number; longitude: number };
  setCoords: (coords: { latitude: number; longitude: number }) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

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
