import Link from 'next/link';
import { Pagination } from '@/types/pagination-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  pagination: Pagination;
  searchParams: URLSearchParams;
}

const PaginatedProducts = ({ pagination, searchParams }: PaginationProps) => {
  const createPaginationLink = (newPage: number) => {
    const query = new URLSearchParams(searchParams);
    query.set('page', String(newPage));
    return `/search?${query.toString()}`;
  };

  const { page, totalPages } = pagination;

  return (
    <div className="mt-4 flex items-center justify-center space-x-4">
      {page > 1 && (
        <Link href={createPaginationLink(page - 1)} aria-label="Previous Page">
          <ChevronLeft className="cursor-pointer text-lg hover:text-blue-500" />
        </Link>
      )}

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Link
            href={createPaginationLink(pageNumber)}
            key={pageNumber}
            aria-label={`Go to page ${pageNumber}`}
          >
            <Button
              variant={pageNumber === page ? 'default' : 'secondary'}
              className={`cursor-pointer rounded-md px-2 py-1 text-center ${
                pageNumber === page ? 'bg-primary text-white' : ''
              }`}
            >
              {pageNumber}
            </Button>
          </Link>
        ))}
      </div>

      {page < totalPages && (
        <Link href={createPaginationLink(page + 1)} aria-label="Next Page">
          <ChevronRight className="cursor-pointer text-lg hover:text-blue-500" />
        </Link>
      )}
    </div>
  );
};

export default PaginatedProducts;
