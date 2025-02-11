'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { useLocation } from '@/context/LocationContext';
import { calculateDistance } from '@/utils/caculateDistance';

const SUBCATEGORY_CLASSES: Record<string, string> = {
  Bouldering: 'border-blue-500 text-blue-500',
  Golfing: 'border-green-500 text-green-500',
  Adventure: 'border-yellow-500 text-yellow-500',
  Bowling: 'border-red-500 text-red-500',
  Default: 'border-gray-300 text-gray-700',
};

const getSubCategoryClasses = (subCategory: string) =>
  SUBCATEGORY_CLASSES[subCategory] || SUBCATEGORY_CLASSES.Default;

const ActivityCard = ({ tagData, activityData }) => {
  //   const { coords, location } = useLocation();
  //   const locationSlug = location?.toLowerCase() || 'uk';

  const {
    activity_name,
    sub_category_name,
    images = {}, // Default empty object to prevent errors
    latitude,
    longitude,
    slug,
  } = activityData;

  const { banner_image } = images; // Destructure safely

  const { coords, location } = useLocation();
  const locationSlug = location?.toLowerCase() || 'uk';
  const distance = calculateDistance(coords.latitude, coords.longitude, latitude, longitude);

  return (
    <Link
      href={`/${locationSlug}/activities/${slug}`}
      className="group block w-80 shrink-0 cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg md:w-96"
    >
      {/* Banner Image */}
      <div className="relative">
        <Image
          src={banner_image}
          alt={`Banner of ${activity_name}`}
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
          <h3 className="text-lg font-bold">{activity_name}</h3>
          {/* <p className="text-sm font-semibold text-gray-700">{createPriceIndicator(price)}</p> */}
        </div>
        <div className="flex items-end justify-between">
          <span
            className={`rounded-full border px-2 py-1 text-xs ${getSubCategoryClasses(
              sub_category_name
            )}`}
          >
            {sub_category_name}
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
