'use client';
import { useEffect, useState } from 'react';

interface Activity {
  name: string;
  category: string;
  description: string;
  tags: string[];
  address: string;
  contact: { phone: string; website: string };
  details: { openingTimes: Record<string, string>; priceRange: string; bannerImage: string };
}

const ActivityDetailPage = ({ params }: { params: { activity_id: string } }) => {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      const response = await fetch('/api/activities');
      const data = await response.json();
      const cityActivity = data.activities.find(
        (act: { activity_id: number }) => act.activity_id.toString() === params.activity_id
      );
      setActivity(cityActivity || null);
    };
    fetchActivityDetails();
  }, [params.activity_id]);

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img
        src={activity.details.bannerImage}
        alt={activity.name}
        className="mb-4 h-80 w-full rounded-lg object-cover"
      />
      <h1 className="mb-2 text-3xl font-bold">{activity.name}</h1>
      <p className="mb-4 text-lg font-semibold">{activity.category}</p>
      <p className="mb-4 text-gray-700">{activity.description}</p>
      <p className="mb-2 text-sm font-semibold text-gray-700">
        Price Range: {activity.details.priceRange}
      </p>
      <div className="mb-4">
        <h2 className="font-semibold">Opening Times</h2>
        <ul className="ml-6 list-disc">
          {Object.entries(activity.details.openingTimes).map(([day, time]) => (
            <li key={day}>
              {day}: {time}
            </li>
          ))}
        </ul>
      </div>
      <a href={activity.contact.website} target="_blank" className="text-blue-500 underline">
        Visit Website
      </a>
    </div>
  );
};

export default ActivityDetailPage;
