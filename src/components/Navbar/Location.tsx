'use client';

import { useState, useEffect } from 'react';

export default function Location() {
  const [location, setLocation] = useState('United Kingdom');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
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
      ];
      setCities(ukCities);
    };
    fetchCities();
  }, []);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleSearchBoxClick = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <div className="flex items-center gap-2 space-x-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search City..."
            value={searchQuery}
            onClick={handleSearchBoxClick}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 rounded-lg border border-gray-300 px-3 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isDropdownOpen && (
            <div className="absolute left-0 z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200"
                  >
                    {city}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No cities found</div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={detectLocation}
          className="rounded-lg bg-white px-3 py-1 font-medium text-gray-800 hover:bg-gray-100"
        >
          {loading ? 'Detecting...' : location === 'United Kingdom' ? 'Detect Location' : location}
        </button>
      </div>
    </div>
  );
}
