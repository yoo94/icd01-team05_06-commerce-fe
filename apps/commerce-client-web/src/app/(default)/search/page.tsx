import FilterComponent from './components/(filters)/filter-component';
import { fetchProducts } from '@/app/actions/product-action';
import { ProductsResponse } from '@/types/product-types';
import ProductList from './components/(searchResult)/product-list';
import { extractSearchParams, ProductsSearchParams } from '@/lib/product-params';

interface SearchPageProps {
  searchParams: ProductsSearchParams;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const queryParams = extractSearchParams({ ...searchParams });

  const productsData: ProductsResponse | null = await fetchProducts(queryParams);

  const filteredBooks = productsData?.products ?? [];
  const pagination = productsData?.pagination;

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
