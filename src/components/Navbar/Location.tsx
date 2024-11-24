'use client';

import { useState, useEffect, useRef } from 'react';
import { IoLocationSharp } from 'react-icons/io5';

export default function Location() {
  const [location, setLocation] = useState('United Kingdom');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ukCities = [
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
    setCities(ukCities.sort());
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

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported');
      return;
    }

    setIsDropdownOpen(false);
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city =
            data.address.city || data.address.town || data.address.village || 'Unknown Location';
          setLocation(city);
          setSearchQuery(city);
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

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleInputChange = (value: string) => {
    setLocation('');
    setSearchQuery(value);
  };

  const filteredCities = searchQuery
    ? cities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : cities;

  return (
    <div className="relative w-56" ref={dropdownRef}>
      <div className="flex w-full items-center rounded-lg border border-gray-300 bg-white p-2 shadow-sm">
        <input
          type="text"
          placeholder="Search City..."
          value={searchQuery || location}
          onClick={() => setIsDropdownOpen(true)}
          onChange={(e) => handleInputChange(e.target.value)}
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
          {filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => handleCitySelect(city)}
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
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
