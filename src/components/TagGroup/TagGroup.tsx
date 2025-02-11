'use client';

import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Activity } from '@/types';
import ActivityCard from '../ActivityCard';
// import ActivityCard from './DBActivityCard/DBActivityCard';
// import ActivityCard from '../ActivityCard';

// interface TagGroupProps {
//   title: string;
//   description: string;
//   tags: string[];
//   activities: Activity[];
// }

// const TagGroup = ({ title, description, tags, activities }: TagGroupProps) => {

const TagGroup = ({ tagData, activityData }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  console.log(activityData);

  useEffect(() => {
    updateScrollState();
  }, [activityData]);

  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild
      ? (container.firstChild as HTMLElement).offsetWidth + 16
      : 300;
    const scrollAmount = cardWidth * Math.floor(container.clientWidth / cardWidth);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className="group/title relative"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* Title & Tags */}
      <div className="group/tag relative inline-block">
        <div className="relative inline-block">
          <h2 className="flex cursor-pointer items-center text-3xl font-semibold capitalize transition duration-300">
            {tagData.groupTitle}
            <span className="ml-2 translate-x-[-10px] transform opacity-0 transition duration-300 group-hover/title:translate-x-0 group-hover/title:opacity-100">
              <MdKeyboardArrowRight />
            </span>
          </h2>
          <div className="absolute top-0 left-full ml-1 flex translate-x-[-20px] translate-y-[10%] gap-2 opacity-0 transition-all duration-300 group-hover/tag:translate-x-0 group-hover/tag:opacity-100">
            {tagData.tags?.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium whitespace-nowrap text-black/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-md text-gray-500">{tagData.description}</p>
      </div>

      {/* Scrollable Activities */}
      <div className="relative">
        {showButtons && canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute top-1/2 -left-10 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={40} />
          </button>
        )}

        {showButtons && canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute top-1/2 -right-10 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={40} />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          className="hide-scrollbar relative flex gap-4 overflow-x-auto px-4 pt-4 pb-8"
        >
          {/* {activityData.map((activity) => (
            <ActivityCard key={activity.activity_id} activityData={activity} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TagGroup;
