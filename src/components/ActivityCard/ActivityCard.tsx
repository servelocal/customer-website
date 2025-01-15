'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BsBookmark } from 'react-icons/bs';
import { useLocation } from '@/context/LocationContext';

interface ActivityCardProps {
  activity_id: number;
  slug: string;
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

const SUBCATEGORY_CLASSES: Record<string, string> = {
  Bouldering: 'border-blue-500 text-blue-500',
  Golfing: 'border-green-500 text-green-500',
  Adventure: 'border-yellow-500 text-yellow-500',
  Bowling: 'border-red-500 text-red-500',
  Default: 'border-gray-300 text-gray-700',
};

const getSubCategoryClasses = (subCategory: string) =>
  SUBCATEGORY_CLASSES[subCategory] || SUBCATEGORY_CLASSES.Default;

// Utility to calculate distance using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

const isValidCoordinate = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): boolean => latitude !== 0 && longitude !== 0;

const ActivityCard: React.FC<ActivityCardProps> = ({
  slug,
  name,
  priceRange,
  bannerImage,
  subCategory,
  coordinates,
}) => {
  const { coords, location } = useLocation();

  const distance = isValidCoordinate(coords)
    ? calculateDistance(
        coords.latitude,
        coords.longitude,
        coordinates.latitude,
        coordinates.longitude
      )
    : null;

  const locationSlug = location?.toLowerCase() || 'default';

  return (
    <Link href={`/${locationSlug}/activities/${slug}`} className="block">
      <div className="group relative w-96 cursor-pointer overflow-hidden rounded-2xl p-3 transition-shadow hover:shadow-xl">
        {/* Banner Image */}
        <div className="relative">
          <Image
            src={bannerImage}
            alt={`Banner of ${name}`}
            width={500}
            height={400}
            className="h-48 w-full rounded-2xl object-cover"
          />
          <div className="absolute right-3 top-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <BsBookmark size={24} />
          </div>
        </div>

        {/* Title and Price */}
        <div className="mt-2 flex items-end justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="ml-auto text-sm font-semibold text-gray-700">{priceRange}</p>
        </div>

        {/* Subcategory and Distance */}
        <div className="mt-1 flex items-end justify-between">
          <div
            className={`inline-block rounded-full border px-2 py-1 text-xs ${getSubCategoryClasses(
              subCategory
            )}`}
          >
            {subCategory}
          </div>
          {distance !== null && (
            <p className="ml-2 text-sm text-gray-600">{distance.toFixed(1)} miles</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
