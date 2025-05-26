'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { useLocation } from '@/context/LocationContext';
import { ActivityCardProps } from '@/types';
import { createPriceIndicator } from '@/utils/priceIndicator';
import { calculateDistance } from '@/utils/caculateDistance';
import { SUBCATEGORY_CLASSES } from '@/types/categories';

const getSubCategoryClasses = (subCategory: string) =>
  SUBCATEGORY_CLASSES[subCategory] || SUBCATEGORY_CLASSES.Default;

const ActivityCard = ({
  slug,
  name,
  price,
  bannerImage,
  subCategory,
  coordinates,
}: ActivityCardProps) => {
  const { coords, location } = useLocation();
  const locationSlug = location?.toLowerCase() || 'uk';
  const distance = calculateDistance(
    coords.latitude,
    coords.longitude,
    coordinates.latitude,
    coordinates.longitude
  );

  return (
    <Link
      href={`/${locationSlug}/activities/${slug}`}
      className="group block w-80 shrink-0 cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg md:w-96"
    >
      {/* Banner Image */}
      <div className="relative">
        <Image
          src={bannerImage}
          alt={`Banner of ${name}`}
          width={500}
          height={400}
          className="h-48 w-full rounded-2xl object-cover"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white p-2 text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:text-red-600">
          <FaRegHeart size={16} />
        </div>
      </div>
      {/* Title, Price, Subcategory, and Distance */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-semibold text-gray-700">{createPriceIndicator(price)}</p>
        </div>
        <div className="flex items-end justify-between">
          <span
            className={`rounded-full border px-2 py-1 text-xs ${getSubCategoryClasses(
              subCategory
            )}`}
          >
            {subCategory}
          </span>
          {distance !== null && (
            <p className="text-sm text-gray-600">{distance.toFixed(1)} miles</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
