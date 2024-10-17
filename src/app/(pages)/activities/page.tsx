'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import ActivitySection from '@components/ActivitySection';

type Activity = {
  name: string;
  type: string;
  category: string;
  address: string;
  contact: {
    phone: string;
    website: string;
  };
  details: {
    openingTimes: {
      [day: string]: string;
    };
    priceRange: string;
    bannerImage: string;
    thumbnailImage: string;
  };
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('/data/activities.json')
      .then((response) => response.json())
      .then((data) => setActivities(data.activities))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  const categories = Array.from(
    new Set(activities.map((activity) => activity.category))
  );

  return (
    <div className={styles.activitiesPage}>
      <h1 className={styles.title}>Activities in Portsmouth</h1>
      {categories.map((category) => (
        <ActivitySection
          key={category}
          category={category}
          activities={activities.filter(
            (activity) => activity.category === category
          )}
        />
      ))}
    </div>
  );
}
