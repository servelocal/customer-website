'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Slide {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number;
  height?: string;
}

export default function Carousel({ slides, interval = 8000, height = '500px' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex, interval]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }} // Custom height applied
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-full w-full flex-shrink-0"
            style={{ minWidth: '100%' }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full"
              priority={index === 0}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
            <div className="shadow-inset absolute inset-0 flex flex-col items-start justify-end bg-black/70 p-20 text-white"></div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-0 h-full p-1 text-white opacity-0 transition-all hover:cursor-pointer hover:opacity-100"
        aria-label="Previous Slide"
      >
        <MdKeyboardArrowLeft size={60} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 h-full p-1 text-white opacity-0 transition-all hover:cursor-pointer hover:opacity-100"
        aria-label="Next Slide"
      >
        <MdKeyboardArrowRight size={60} />
      </button>
      {/* Content */}
      <div className="absolute bottom-20 left-20 flex overflow-hidden">
        <div key={currentIndex} className="animate-slideIn text-white">
          <h2 className="mb-1 text-2xl font-bold md:text-6xl">{slides[currentIndex].title}</h2>
          <p className="text-base text-gray-300 md:text-xl">{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.length > 1 &&
          slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-1 w-10 ${index === currentIndex ? 'bg-white' : 'bg-gray-700 opacity-70 hover:bg-gray-400 hover:opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Larger invisible clickable zone */}
              <span
                className="absolute inset-0 -top-4 -bottom-4 hover:cursor-pointer"
                aria-hidden="true"
              ></span>
            </button>
          ))}
      </div>
    </div>
  );
}
