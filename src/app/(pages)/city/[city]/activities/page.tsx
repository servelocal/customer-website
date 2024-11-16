'use client';
import { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';

interface Activity {
  activity_id: number;
  name: string;
  category: string;
  details: { bannerImage: string; thumbnailImage: string; priceRange: string };
}

const ActivitiesPage = ({ params }: { params: { city: string } }) => {
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/activities');
      const data = await response.json();

      const cityData = data.city.toLowerCase() === params.city.toLowerCase() ? data.activities : [];
      const categorized = cityData.reduce((acc: Record<string, Activity[]>, activity: Activity) => {
        acc[activity.category] = acc[activity.category] || [];
        acc[activity.category].push(activity);
        return acc;
      }, {});
      setActivities(categorized);
    };
    fetchActivities();
  }, [params.city]);

  return (
    <>
      <Banner
        title={`Activities in ${params.city.charAt(0).toUpperCase() + params.city.slice(1)}`}
        subtitle="Discover amazing services and activities in your area"
        backgroundImage="https://img.freepik.com/premium-vector/yellow-background-with-dynamic-abstract-shapes_580167-286.jpg"
      />
      <div className="container mx-auto p-4">
        {Object.entries(activities).map(([category, activities]) => (
          <CategorySection key={category} category={category} activities={activities} />
        ))}
      </div>
    </>
  );
};

export default ActivitiesPage;
