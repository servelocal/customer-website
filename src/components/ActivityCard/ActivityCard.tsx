'use client';

import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { ActivityProps } from '@/types';
import { createPriceIndicator } from '@/utils/priceIndicator';
import { calculateDistance } from '@/utils/caculateDistance';
import { SUBCATEGORY_CLASSES } from '@/types/categories';
import ActivityImage from './ActivityImage';

const getSubCategoryClasses = (subCategory: string) =>
  SUBCATEGORY_CLASSES[subCategory] || SUBCATEGORY_CLASSES.Default;

const ExtendedCard = ({
  slug,
  name,
  price,
  bannerImage,
  subCategory,
  coordinates,
}: ActivityProps) => {
  const { coords, location } = useLocation();
  const locationSlug = location?.toLowerCase() || 'uk';

  const distance =
    coords && coordinates
      ? calculateDistance(
          coords.latitude,
          coords.longitude,
          coordinates.latitude,
          coordinates.longitude
        )
      : null;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Link
      href={`/${locationSlug}/activities/${slug}`}
      className="group block w-80 shrink-0 cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg md:w-96"
      aria-label={`View details of ${name}`}
    >
      {/* Banner Image */}
      <ActivityImage name={name} slug={slug} bannerImage={bannerImage} />

      {/* Content */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-semibold text-gray-700">{createPriceIndicator(price)}</p>
        </div>

        <span
          className={`inline-block rounded-full border px-2 py-1 text-xs ${getSubCategoryClasses(
            subCategory
          )}`}
        >
          {subCategory}
        </span>

        {distance !== null && (
          <p className="text-sm text-gray-600">{distance.toFixed(1)} miles away</p>
        )}
      </div>
    </Link>
  );
};

export default ExtendedCard;
