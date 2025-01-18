'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BsBookmark } from 'react-icons/bs';
import { useLocation } from '@/context/LocationContext';
import { ActivityCardProps } from '@/types';
import { getSubCategoryClasses, calculateDistance, isValidCoordinate, createPriceIndicator } from '@/utils/activityCard';

function ActivityCard({
  slug,
  name,
  price,
  bannerImage,
  subCategory,
  coordinates,
}: ActivityCardProps) {
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
            priority
          />
          <div className="absolute right-3 top-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <BsBookmark size={24} />
          </div>
        </div>

        {/* Title and Price */}
        <div className="mt-2 flex items-end justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="ml-auto text-sm font-semibold text-gray-700">
            {createPriceIndicator(price)}
          </p>
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
}

export default ActivityCard;
