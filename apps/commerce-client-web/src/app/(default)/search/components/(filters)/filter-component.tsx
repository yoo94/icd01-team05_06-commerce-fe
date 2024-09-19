'use client';

import { Book } from '@/types/book-types';
import { Accordion } from '@/components/ui/accordion';
import PriceFilter from './price-filter';
import PublisherFilter from './publisher-filter';
import CategoryFilter from './category-filter';
import { Suspense } from 'react';

const FilterComponent = ({ books }: { books: Book[] }) => {
  const publishers = [...new Set(books.map((book) => book.publisher))];

  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <Accordion type="multiple" className="w-full">
        <PriceFilter />
        <Suspense fallback="로딩 중..">
          <PublisherFilter publishers={publishers} />
        </Suspense>
        <CategoryFilter books={books} />
      </Accordion>
    </div>
  );
};

export default FilterComponent;
