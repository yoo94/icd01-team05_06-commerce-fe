import FilterComponent from './components/(filters)/filter-component';
import { fetchProducts } from '@/app/actions/product-action';
import { ProductsResponse } from '@/types/product-types';
import ProductList from './components/(searchResult)/product-list';

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

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  // Convert `page` and `size` params to numbers or default them
  const page = parseInt(searchParams.page || '1', 10);
  const size = parseInt(searchParams.size || '20', 10);

  const booksData: ProductsResponse | null = await fetchProducts({
    page,
    size,
    productCategoryId: searchParams.category ? parseInt(searchParams.category, 1) : undefined,
    searchWord: searchParams.searchWord,
  });

  const filteredBooks = booksData?.products ?? [];
  const pagination = booksData?.pagination;

  return (
    <div className="flex">
      <div className="hidden w-1/5 p-4 lg:block">
        <FilterComponent books={filteredBooks} />
      </div>

      <div className="w-full p-4 lg:w-4/5">
        <h1 className="mb-4 text-xl font-bold">상품 목록</h1>
        <ProductList books={filteredBooks} pagination={pagination} />
      </div>
    </div>
  );
};

export default SearchPage;
