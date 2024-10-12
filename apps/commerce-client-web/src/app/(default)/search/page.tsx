import FilterComponent from './components/(filters)/filter-component';
import SearchResult from './components/(searchResult)/search-result';
import PaginatedProducts from './components/(pagination)/paginated-products';
import { productApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { ProductsResponse } from '@/types/product-types';
import { extractSearchParams } from '@/lib/extractSearchParams';

interface SearchPageProps {
  searchParams: {
    searchWord?: string;
    price?: string;
    publisher?: string;
    category?: string;
    page?: string;
    size?: string;
  };
}

const getAllBooks = async () => {
  const booksData = await productApi.get(`products`).json<ApiResponse<ProductsResponse>>();
  return booksData.data?.products ?? [];
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const queryParams = extractSearchParams(searchParams);

  const booksData = await productApi
    .get(`products?${queryParams}`)
    .json<ApiResponse<ProductsResponse>>();

  const filteredBooks = booksData.data?.products ?? [];
  const allBooks = await getAllBooks();
  const pagination = booksData.data?.pagination;

  return (
    <div className="flex">
      <div className="hidden w-1/5 p-4 lg:block">
        <FilterComponent books={allBooks} />
      </div>

      <div className="w-full p-4 lg:w-4/5">
        <h1 className="mb-4 text-xl font-bold">상품 목록</h1>

        <SearchResult books={filteredBooks} />
        <PaginatedProducts
          pagination={pagination}
          searchParams={new URLSearchParams(searchParams)}
        />
      </div>
    </div>
  );
};

export default SearchPage;
