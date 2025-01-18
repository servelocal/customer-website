'use client';

import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Activity } from '@/types';
import ActivityCard from '../ActivityCard';

interface CategorySectionProps {
  title: string;
  activities: Activity[];
}

const CategorySection = ({ title, activities }: CategorySectionProps) => {
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
      className="relative"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
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
