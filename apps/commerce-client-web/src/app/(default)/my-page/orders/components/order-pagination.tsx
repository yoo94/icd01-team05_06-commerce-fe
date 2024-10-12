import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface OrderPaginationProps {
  currentPage: number;
  totalPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const generatePages = ({
  currentPage,
  totalPage,
  groupSize = 5,
}: {
  currentPage: number;
  totalPage: number;
  groupSize?: number;
}) => {
  const startPage = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPage);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const OrderPagination = ({ currentPage, totalPage, hasPrev, hasNext }: OrderPaginationProps) => {
  const pages = generatePages({
    currentPage,
    totalPage,
  });

  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <Button variant="link" className="px-2 text-slate-500" asChild>
              <Link href={`?page=${currentPage - 1}`}>
                <ChevronLeft />
              </Link>
            </Button>
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`?page=${page}`} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNext && (
          <PaginationItem>
            <Button variant="link" className="px-2 text-slate-500" asChild>
              <Link href={`?page=${currentPage + 1}`}>
                <ChevronRight />
              </Link>
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default OrderPagination;
