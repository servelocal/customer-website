'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BsBookmark } from 'react-icons/bs';
import { useLocation } from '@/context/LocationContext';

interface ActivityCardProps {
  activity_id: number;
  name: string;
  priceRange: string;
  thumbnailImage: string;
  bannerImage: string;
  subCategory: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const getSubCategoryClasses = (subCategory: string) => {
  const colorClasses: Record<string, string> = {
    Bouldering: 'border-blue-500 text-blue-500',
    Golfing: 'border-green-500 text-green-500',
    Adventure: 'border-yellow-500 text-yellow-500',
    Bowling: 'border-red-500 text-red-500',
    Default: 'border-gray-300 text-gray-700',
  };

  return colorClasses[subCategory] || colorClasses.Default;
};

// Utility to calculate distance using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

const ActivityCard = ({
  activity_id,
  name,
  priceRange,
  bannerImage,
  subCategory,
  coordinates,
}: ActivityCardProps) => {
  const { coords, location } = useLocation();

  const isValidCoordinate = ({ latitude, longitude }: { latitude: number; longitude: number }) =>
    latitude !== 0 && longitude !== 0;

  const distance = isValidCoordinate(coords)
    ? calculateDistance(
        coords.latitude,
        coords.longitude,
        coordinates.latitude,
        coordinates.longitude
      )
    : null;

  return (
    <Link href={`/${location.toLocaleLowerCase() || 'default'}/activities/${activity_id}`}>
      <div className="group relative w-96 cursor-pointer overflow-hidden rounded-2xl p-3 transition-all hover:shadow-lg">
        <div className="relative">
          <Image
            src={bannerImage}
            alt={name}
            width={500}
            height={400}
            className="h-48 rounded-2xl object-cover"
          />
          <div className="absolute right-3 top-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <BsBookmark size={24} />
          </div>
        </div>
        <div className="m-2">
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="text-lg font-bold">{name}</h3>
              <div
                className={`my-1 inline-block rounded-full border px-1.5 py-1 text-xs ${getSubCategoryClasses(
                  subCategory
                )}`}
              >
                {subCategory}
              </div>
            </div>
            <div className="text-right">
              <p className="ml-auto text-sm font-semibold text-gray-700">{priceRange}</p>
              {distance && (
                <p className="text-sm text-gray-600">{distance.toFixed(1)} miles away</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
