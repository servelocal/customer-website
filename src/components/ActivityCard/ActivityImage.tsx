'use client';

import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';

interface ActivityImageProps {
  name: string;
  slug: string;
  bannerImage: string;
}

const ActivityImage = ({ name, bannerImage, slug }: ActivityImageProps) => {
  return (
    <div className="relative w-90">
      <Image
        src={`/images/${slug}/${bannerImage}`}
        alt={`Banner of ${name}`}
        width={500}
        height={400}
        className="h-48 w-full rounded-2xl object-cover"
      />
      <div className="absolute top-3 right-3 rounded-full bg-white p-2 text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:text-red-600">
        <FaRegHeart size={16} />
      </div>
    </div>
  );
};

export default ActivityImage;
