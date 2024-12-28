'use client';

import { useEffect, useState } from 'react';
// import { useLocation } from '@/context/LocationProvider'; // Import the hook
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import data from '@/data/activities.json';
import { Activity } from '@/types';
import { useLocation } from '@/context/LocationContext';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';

const categoriseActivities = (activities: Activity[]): Record<string, Activity[]> => {
  return activities.reduce((acc: Record<string, Activity[]>, activity) => {
    acc[activity.category] = acc[activity.category] || [];
    acc[activity.category].push(activity);
    return acc;
  }, {});
};

const fetchActivities = async (location: string): Promise<Record<string, Activity[]>> => {
  const lowercasedCity = location.toLowerCase();
  if (data.location.toLowerCase() === lowercasedCity) {
    return categoriseActivities(data.activities);
  }
  return {};
};

const ActivitiesPage = ({ params }: { params: Promise<{ location: string }> }) => {
  const { location, setLocation } = useLocation(); // Use the context
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});

  useEffect(() => {
    const fetchLocation = async () => {
      const resolvedParams = await params;
      const paramLocation = resolvedParams.location;

      // Fetch the location from the API route
      const res = await fetch('/api/location', { method: 'GET' });
      const { location: cookieLocation } = await res.json();

      // Update location via context
      const currentLocation = paramLocation || cookieLocation;
      setLocation(currentLocation);

      // Save to cookie via API if params location differs
      if (paramLocation && paramLocation !== cookieLocation) {
        await fetch('/api/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location: paramLocation }),
        });
      }

      // Fetch activities for the current location
      const fetchedActivities = await fetchActivities(currentLocation);
      setActivities(fetchedActivities);
    };

    fetchLocation();
  }, [params, setLocation]);

  return (
    <>
      <Banner
        title={`Activities in ${capitalise(location)}`}
        subtitle="Discover amazing services and activities in your area"
        backgroundImage={DEFAULT_BACKGROUND_IMAGE}
      />
      <div className="container mx-auto p-4">
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(([category, activities]) => (
            <CategorySection
              key={category}
              category={capitalise(category)}
              activities={activities}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;
