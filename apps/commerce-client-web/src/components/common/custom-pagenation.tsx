'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  groupSize?: number; // Optional group size for pagination, defaults to 5
  generatePageLink?: (page: number) => string; // Optional custom page link generator
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
  if (totalPage === 0) return []; // Ensure that pages are generated only if totalPage > 0

  const startPage = Math.max(1, Math.floor((currentPage - 1) / groupSize) * groupSize + 1);
  const endPage = Math.min(startPage + groupSize - 1, totalPage);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const CustomPagination = ({
  currentPage,
  totalPage,
  hasPrev,
  hasNext,
  groupSize = 5,
  generatePageLink = (page: number) => `?page=${page}`, // Default link generator if none is provided
}: PaginationProps) => {
  const pages = generatePages({
    currentPage,
    totalPage,
    groupSize,
  });

  console.log('currentPage:', currentPage);
  console.log('totalPage:', totalPage);

  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <Button variant="link" className="px-2 text-slate-500" asChild>
              <Link href={generatePageLink(currentPage - 1)}>
                <ChevronLeft />
              </Link>
            </Button>
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={generatePageLink(page)} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNext && (
          <PaginationItem>
            <Button variant="link" className="px-2 text-slate-500" asChild>
              <Link href={generatePageLink(currentPage + 1)}>
                <ChevronRight />
              </Link>
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
