'use client';

import { useState } from 'react';
import Image from 'next/image';
import FullScreenImage from './FullScreenImage';

type ImageGalleryProps = {
  images: string[];
  slug: string;
};

export default function ImageGallery({ images, slug }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openImage = (index: number) => setSelectedIndex(index);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-4xl brightness-105">
        {images.slice(0, 4).map((src, index) => (
          <div
            key={index}
            className="relative aspect-square w-full transition-all active:scale-95"
            onClick={() => openImage(index)}
          >
            <Image
              src={`/images/${slug}/${src}`}
              alt={`Gallery image ${index + 1}`}
              fill
              className="rounded-lg object-cover hover:cursor-pointer"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <FullScreenImage
          images={images}
          slug={slug}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </>
  );
}
