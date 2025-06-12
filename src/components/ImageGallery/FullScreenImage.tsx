'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type ImageGalleryProps = {
  images: string[];
  slug: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function FullScreenImage({
  images,
  slug,
  selectedIndex,
  setSelectedIndex,
}: ImageGalleryProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  const closeImage = () => setSelectedIndex(null);

  const prevImage = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
  const nextImage = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1));

  return (
    <>
      {selectedIndex !== null && (
        <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-white">
          {/* Close Button */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-50 rounded-full p-4 text-2xl text-gray-600 hover:bg-gray-50/30"
            aria-label="Close"
          >
            <IoMdClose />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-50 rounded-full p-4 text-5xl text-gray-600 hover:bg-gray-50/30"
            aria-label="Previous image"
          >
            <MdKeyboardArrowLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-50 rounded-full p-4 text-5xl text-gray-600 hover:bg-gray-50/30"
            aria-label="Next image"
          >
            <MdKeyboardArrowRight />
          </button>

          {/* Fullscreen Image */}
          <div className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl">
            <Image
              key={images[selectedIndex]} // ensures re-render on change
              src={`/images/${slug}/${images[selectedIndex]}`}
              alt="Fullscreen"
              width={1200}
              height={800}
              className="animate-scale max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
