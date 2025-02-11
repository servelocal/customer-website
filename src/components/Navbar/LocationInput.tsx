'use client';

import { useState, useEffect, useRef } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/context/LocationContext';
import { capitalise } from '@/utils/capitalise';

const UK_CITIES: string[] = [
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Edinburgh',
  'Glasgow',
  'Bristol',
  'Leeds',
  'Cardiff',
  'Nottingham',
  'Sheffield',
  'Leicester',
  'Coventry',
  'Bradford',
  'Stoke-on-Trent',
  'Wolverhampton',
  'Middlesbrough',
  'Hull',
  'Sunderland',
  'Portsmouth',
  'Bournemouth',
];

type Coordinates = {
  latitude: number;
  longitude: number;
};

type FetchCityNameResult = {
  city: string;
  coordinates: Coordinates;
};

export default function LocationInput() {
  const { location, setLocation, setCoords } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    setFilteredCities(UK_CITIES.sort());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetSelection = (): void => {
    setSelectedIndex(0);
    setIsDropdownOpen(false);
  };

  const handleCitySelect = (city: string): void => {
    setLocation(city, null); // Pass `null` as the second argument for consistency
    setSearchQuery('');
    resetSelection();

    router.push(`/${city.toLowerCase()}/activities`);
  };

  const handleInputChange = (value: string): void => {
    setSearchQuery(value);
    setFilteredCities(
      value
        ? UK_CITIES.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
        : UK_CITIES
    );
    setSelectedIndex(0);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!filteredCities.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCities.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && isDropdownOpen) {
      e.preventDefault();
      handleCitySelect(filteredCities[selectedIndex]);
    }
  };

  const fetchCityName = async ({
    latitude,
    longitude,
  }: Coordinates): Promise<FetchCityNameResult> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      const city =
        data.address.city || data.address.town || data.address.village || 'Unknown Location';
      return { city, coordinates: { latitude, longitude } };
    } catch {
      return { city: 'Unable to fetch location', coordinates: { latitude, longitude } };
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported', null); // Pass `null` for coordinates
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { city, coordinates } = await fetchCityName({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setCoords(coordinates); // Save the coordinates
        setLocation(city, coordinates); // Save the city name with coordinates
        setSearchQuery(city); // Update the input with the city name
        router.push(`/${city.toLowerCase()}/activities`);
      },
      () => setLocation('Permission Denied', null), // Pass `null` for coordinates in case of permission denial
      { enableHighAccuracy: true }
    );
    resetSelection();
  };

  return (
    <div className="relative w-56" ref={dropdownRef}>
      <div className="flex w-full items-center rounded-lg border border-gray-300 bg-white p-2 shadow-sm">
        <input
          type="text"
          placeholder="Search City..."
          value={isDropdownOpen || searchQuery ? searchQuery : capitalise(location)}
          onClick={() => {
            if (!isDropdownOpen) {
              setSearchQuery(location);
              setIsDropdownOpen(true);
            }
          }}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border-none bg-transparent p-1 text-gray-800 focus:outline-none"
        />
        <button onClick={detectLocation} className="ml-2 flex items-center justify-center">
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
          ) : (
            <IoLocationSharp className="text-2xl text-black" />
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {filteredCities.map((city, index) => (
            <div
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                index === selectedIndex ? 'bg-gray-100' : ''
              }`}
            >
              {city}
            </div>
          ))}
          {!filteredCities.length && <div className="px-4 py-2 text-gray-500">No cities found</div>}
        </div>
      )}
    </div>
  );
}
