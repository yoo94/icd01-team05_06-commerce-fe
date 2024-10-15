'use client';

import CustomPagination from '@/components/common/custom-pagenation';
import { Product } from '@/types/product-types';
import { Pagination } from '@/types/pagination-types';
import SearchResult from './search-result';

interface ProductListProps {
  books: Product[];
  pagination: Pagination | null;
}

const ProductList = ({ books, pagination }: ProductListProps) => {
  return (
    <div>
      <SearchResult books={books} />

      {pagination && (
        <CustomPagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          hasNext={pagination.hasNextPage}
          hasPrev={pagination.hasPreviousPage}
          generatePageLink={(page) => `?page=${page}`} // Define how the link should look
        />
      )}
    </div>
  );
};

export default ProductList;
