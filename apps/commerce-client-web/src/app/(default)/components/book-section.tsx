'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'; // Import Carousel components from shadcn/ui
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product-types';

interface BookSectionProps {
  title: string;
  books: Product[];
}

const BookSection = ({ title, books }: BookSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [itemsPerView, setItemsPerView] = useState(5);

  const isMdScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    // Adjust the number of items per view based on the screen size
    setItemsPerView(isMdScreen ? 3 : 5);
  }, [isMdScreen]);

  const groupedBooks = [];

  for (let i = 0; i < books.length; i += itemsPerView) {
    groupedBooks.push(books.slice(i, i + itemsPerView));
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div>
        <Carousel ref={carouselRef} className="relative overflow-hidden">
          <CarouselContent>
            {groupedBooks.map((group, index) => (
              <CarouselItem key={index} className="flex space-x-4 pl-4">
                {group.map((book) => (
                  <div key={book.id} className="w-[calc(100%/3)] md:w-[calc(100%/4)]">
                    <Link
                      href={`/details/${book.id}`}
                      className="relative flex h-36 w-full drop-shadow-md md:h-48"
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </Link>
                    <p className="mt-4 text-xs font-light text-slate-500">
                      {book.category.parentCategory.name} &gt; {book.category.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{book.title}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {book.author} ・ {book.publisher}
                    </p>
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
            aria-label="Previous"
          />

          <CarouselNext
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
            aria-label="Next"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default BookSection;
