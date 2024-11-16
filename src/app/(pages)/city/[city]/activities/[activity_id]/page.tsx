'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Activity {
  name: string;
  category: string;
  sub_category: string;
  description: string;
  tags: string[];
  address: string;
  contact: { phone: string; website: string };
  details: {
    openingTimes: Record<string, string>;
    priceRange: string;
    bannerImage: string;
    thumbnailImage: string;
  };
}

const ActivityDetailPage = () => {
  const params = useParams();
  const activityId = params?.activity_id;
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      const response = await fetch('/api/activities');
      const data = await response.json();
      const cityActivity = data.activities.find(
        (act: { activity_id: number }) => act.activity_id.toString() === activityId
      );
      setActivity(cityActivity || null);
    };
    if (activityId) fetchActivityDetails();
  }, [activityId]);

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-6">
        <img
          src={activity.details.bannerImage}
          alt={activity.name}
          className="h-96 w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-lg bg-white p-5 shadow-md">
          <img
            src={activity.details.thumbnailImage}
            alt={`${activity.name} thumbnail`}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{activity.name}</h1>
            <p className="text-sm font-medium text-gray-500">{activity.sub_category}</p>
            <p className="text-sm font-medium text-gray-700">{activity.category}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="text-md rounded bg-black/10 px-3 py-1 text-black/80 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Description</h2>
        <p className="text-gray-700">{activity.description}</p>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Address</h2>
        <p className="text-gray-700">{activity.address}</p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Contact</h2>
        <p className="text-gray-700">Phone: {activity.contact.phone}</p>
        <a
          href={activity.contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit Website
        </a>
      </div>

      {/* Opening Times */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Opening Times</h2>
        <ul className="ml-6 list-disc">
          {Object.entries(activity.details.openingTimes).map(([day, time]) => (
            <li key={day} className="text-gray-700">
              {day}: {time}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Price Range</h2>
        <p className="text-gray-700">{activity.details.priceRange}</p>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
