'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Image = {
  src: string;
  alt: string;
};

interface SliderBannerProps {
  images: Image[];
}

const SliderBanner = ({ images }: SliderBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-screen-lg overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="h-96 w-full flex-none" key={index}>
            <Image src={image.src} alt={image.alt} fill />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between gap-x-4">
        <Button onClick={prevSlide} className="flex-1 text-base">
          Prev
        </Button>
        <Button onClick={nextSlide} className="flex-1 text-base">
          Next
        </Button>
      </div>
    </div>
  );
};

export default SliderBanner;
