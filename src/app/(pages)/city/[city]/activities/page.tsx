'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import data from '@/data/activities.json';
import { Activity } from '@/types';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';

const categoriseActivities = (activities: Activity[]): Record<string, Activity[]> => {
  return activities.reduce((acc: Record<string, Activity[]>, activity) => {
    acc[activity.category] = acc[activity.category] || [];
    acc[activity.category].push(activity);
    return acc;
  }, {});
};

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});
  const { city }: { city?: string } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!city) {
        setActivities({});
        return;
      }

      const lowercasedCity = city.toLowerCase();
      const cityActivities = data.city.toLowerCase() === lowercasedCity ? data.activities : [];
      const categorized = categoriseActivities(cityActivities);
      setActivities(categorized);
    };

    fetchActivities();
  }, [city]);

  return (
    <>
      <Banner
        title={`Activities in ${capitalise(city || 'your area')}`}
        subtitle="Discover amazing services and activities in your area"
        backgroundImage={DEFAULT_BACKGROUND_IMAGE}
      />
      <div className="container mx-auto p-4">
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(([category, activities]) => (
            <CategorySection key={category} category={category} activities={activities} />
          ))
        ) : (
          <p className="text-center text-gray-500">No activities found for this city.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;
