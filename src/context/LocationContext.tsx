'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  location: string;
  setLocation: (newLocation: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<string>('United Kingdom'); // Default location

  useEffect(() => {
    // Fetch the initial location from the API on mount
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/location', { method: 'GET' });
        const data = await response.json();
        if (response.ok) {
          setLocationState(data.location || 'United Kingdom'); // Fallback to default if no location
        }
      } catch (error) {
        console.error('Failed to fetch location:', error);
      }
    };

    fetchLocation();
  }, []);

  const setLocation = async (newLocation: string) => {
    try {
      // Update the location in the API
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: newLocation }),
      });

      const data = await response.json();
      if (response.ok) {
        setLocationState(newLocation); // Update local state on success
      } else {
        console.error('Error updating location:', data.error);
      }
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
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
