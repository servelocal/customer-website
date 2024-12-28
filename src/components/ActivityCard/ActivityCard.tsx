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

const ActivityCard = ({
  activity_id,
  name,
  priceRange,
  bannerImage,
  subCategory,
}: ActivityCardProps) => {
  const { location } = useLocation();

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
          <div className="flex items-start justify-between">
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
            <p className="ml-auto text-sm font-semibold text-gray-700">{priceRange}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
