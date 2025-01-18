'use client';

import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Activity } from '@/types';
import ActivityCard from '../ActivityCard';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface CategorySectionProps {
  title: string;
  tags: string[];
  activities: Activity[];
}

const CategorySection = ({ title, tags, activities }: CategorySectionProps) => {
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
      <div className="relative inline-block">
        {/* Title Wrapper for Full Hover */}
        <div className="group/tag relative inline-block">
          <h2 className="flex items-center align-baseline text-2xl font-semibold transition-colors duration-300 hover:cursor-pointer">
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
          <div className="absolute left-full top-1/2 ml-2 flex w-screen translate-x-[-10px] translate-y-[-50%] flex-nowrap gap-2 overflow-x-auto opacity-0 transition-all duration-300 group-hover/tag:translate-x-0 group-hover/tag:opacity-100">
            {tags.map((tag) => (
              <span
                key={tag}
                className="shrink-0 whitespace-nowrap rounded-full bg-black/10 px-3 py-1 text-sm font-medium text-black/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-visible">
        {/* Scroll Buttons */}
        {canScrollLeft && showButtons && (
          <button
            onClick={scrollLeft}
            className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-black shadow-md focus:outline-none"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={40} />
          </button>
        )}
        {canScrollRight && showButtons && (
          <button
            onClick={scrollRight}
            className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-black shadow-md focus:outline-none"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={40} />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="hide-scrollbar relative flex scroll-p-4 gap-4 overflow-x-auto overflow-y-visible px-4 pb-8"
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

export default CategorySection;
