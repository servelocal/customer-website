'use client';

import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Activity } from '@/types';
import ActivityCard from '../ActivityCard';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface TagGroupProps {
  title: string;
  description: string;
  tags: string[];
  activities: Activity[];
}

const TagGroup = ({ title, description, tags, activities }: TagGroupProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollWidth, clientWidth } = container;
      setCanScrollRight(scrollWidth > clientWidth);
    }
  }, [activities]);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.firstChild
        ? (container.firstChild as HTMLElement).offsetWidth + 16
        : 300;
      container.scrollBy({
        left: -cardWidth * Math.floor(container.clientWidth / cardWidth),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.firstChild
        ? (container.firstChild as HTMLElement).offsetWidth + 16
        : 300;
      container.scrollBy({
        left: cardWidth * Math.floor(container.clientWidth / cardWidth),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="group/title relative"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* Category Title with Tags */}
      <div className="group/tag relative inline-block">
        {/* Title Wrapper for Full Hover */}
        <div className="relative inline-block">
          <h2 className="flex items-center align-baseline text-3xl font-semibold transition-colors duration-300 hover:cursor-pointer">
            {title}
            {/* Arrow (visible only on title hover) */}
            <span
              className="ml-2 translate-x-[-10px] transform opacity-0 transition-all duration-300 group-hover/title:translate-x-0 group-hover/title:opacity-100"
              aria-hidden="true"
            >
              <MdKeyboardArrowRight />
            </span>
          </h2>

          {/* Sliding Tags (visible when hovering over any part of the title) */}
          <div className="absolute top-0 left-full ml-1 flex w-full translate-x-[-20px] translate-y-[10%] flex-nowrap gap-2 overflow-x-visible opacity-0 transition-all duration-300 group-hover/tag:translate-x-0 group-hover/tag:opacity-100">
            {tags.map((tag) => (
              <span
                key={tag}
                className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium whitespace-nowrap text-black/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-md text-gray-500">{description}</p>
      </div>

      <div className="relative overflow-visible">
        {/* Scroll Buttons */}
        {canScrollLeft && showButtons && (
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -left-10 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-black shadow-md focus:outline-none"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={40} />
          </button>
        )}
        {canScrollRight && showButtons && (
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -right-10 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-black shadow-md focus:outline-none"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={40} />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="hide-scrollbar relative flex scroll-p-4 gap-4 overflow-x-auto overflow-y-visible px-4 pt-4 pb-8"
        >
          {activities.map(
            ({
              activity_id,
              slug,
              name,
              sub_category,
              details: { bannerImage, thumbnailImage, price },
              coordinates,
            }) => (
              <ActivityCard
                key={activity_id}
                slug={slug}
                name={name}
                price={price}
                thumbnailImage={thumbnailImage}
                bannerImage={bannerImage}
                subCategory={sub_category}
                coordinates={coordinates}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TagGroup;
