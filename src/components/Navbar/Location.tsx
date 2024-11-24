'use client';

import { useState } from 'react';

export default function Location() {
  const [location, setLocation] = useState('United Kingdom');
  const [loading, setLoading] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city =
            data.address.city || data.address.town || data.address.village || 'Unknown Location';
          setLocation(city);
        } catch {
          setLocation('Unable to fetch location');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocation('Permission Denied');
        setLoading(false);
      }
    );
  };

  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={detectLocation}
        className="text-md rounded-lg bg-white px-3 py-1 font-medium text-gray-800 hover:bg-gray-100"
      >
        {loading ? 'Detecting...' : location}
      </button>
    </div>
  );
}
