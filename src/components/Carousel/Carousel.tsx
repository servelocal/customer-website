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
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 h-full w-full"
              priority={index === 0}
            />
            <div className="shadow-inset absolute inset-0 flex flex-col items-start justify-center bg-black/20 p-20 text-white">
              <h2 className="mb-2 text-2xl font-bold md:text-4xl">{slide.title}</h2>
              <p className="text-base md:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-0 h-full p-1 text-white opacity-0 transition-all hover:opacity-100"
        aria-label="Previous Slide"
      >
        <MdKeyboardArrowLeft size={60} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-0 h-full p-1 text-white opacity-0 transition-all hover:opacity-100"
        aria-label="Next Slide"
      >
        <MdKeyboardArrowRight size={60} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-800 opacity-60 hover:bg-black'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
