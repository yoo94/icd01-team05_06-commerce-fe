import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
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
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default OrderPagination;
