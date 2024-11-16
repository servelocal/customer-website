'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';

interface Activity {
  activity_id: number;
  name: string;
  category: string;
  details: { bannerImage: string; thumbnailImage: string; priceRange: string };
}

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});
  const params: { city?: string | undefined } = useParams(); // Use the useParams hook
  console.log(params.city);
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/activities');
      const data = await response.json();
      console.log(data.activities);
      console.log(data.city.toLowerCase());
      console.log(params.city);

      const cityData = data.city.toLowerCase() === params.city ? data.activities : [];
      console.log(cityData);
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
        title={`Activities in ${capitalise(params.city)}`}
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
