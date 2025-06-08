'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { useLocation } from '@/context/LocationContext';
import { ActivityCardProps } from '@/types';
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
  description,
  subCategory,
  coordinates,
}: ActivityCardProps) => {
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
      className="group flex w-full gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md"
      aria-label={`View details of ${name}`}
    >
      {/* Banner Image */}
      <ActivityImage name={name} bannerImage={bannerImage} />

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base font-semibold text-gray-900">{name}</h3>
            <span className="text-sm whitespace-nowrap text-gray-700">
              {createPriceIndicator(price)}
            </span>
          </div>

          <span
            className={`inline-block w-fit rounded-full border px-2 py-0.5 text-xs font-medium ${getSubCategoryClasses(
              subCategory
            )}`}
          >
            {subCategory}
          </span>

          <p className="text-sm text-gray-600">{truncateText(description || '', 100)}</p>
        </div>

        {distance !== null && (
          <p className="text-xs text-gray-500">{distance.toFixed(1)} miles away</p>
        )}
      </div>
    </Link>
  );
};

export default ExtendedCard;
