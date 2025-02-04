'use client';

import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { slugify } from '@/utils/slugify';

export type CategoryProps = {
  id?: number;
  name: string;
  description?: string;
  icon: string;
};

const Category = ({ name, icon }: CategoryProps) => {
  const { location } = useLocation();
  const locationSlug = location?.toLowerCase() || 'uk';
  let IconComponent =
    Icons[icon as keyof typeof Icons] ||
    MdIcons[icon as keyof typeof MdIcons] ||
    GiIcons[icon as keyof typeof GiIcons];

  if (!IconComponent) {
    console.error(`Icon ${icon} not found.`);
    return null;
  }

  return (
    <Link
      href={`/${locationSlug}/activities/category/${slugify(name)}`}
      className="flex w-fit items-center gap-2 rounded-3xl border border-gray-300 px-3 py-2 hover:cursor-pointer hover:bg-gray-100"
    >
      <IconContext.Provider value={{ size: '1rem', color: '#000' }}>
        <IconComponent />
      </IconContext.Provider>
      <h3>{name}</h3>
    </Link>
  );
};

export default Category;
