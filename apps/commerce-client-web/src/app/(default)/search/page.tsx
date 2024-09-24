import FilterComponent from './components/(filters)/filter-component';
import SearchResult from './components/(searchResult)/search-result';
import { filterBooksByCategoryName } from '@/lib/utils';
import { productApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { ProductsResponse } from '@/types/product-types';

interface SearchPageProps {
  searchParams: {
    word?: string;
    price?: string;
    publisher?: string;
    category?: string;
    tag?: string;
  };
}

const defaultPage = 1;
const defaultSize = 20;

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const booksData = await productApi
    .get(`products?page=${defaultPage}&size=${defaultSize}`)
    .json<ApiResponse<ProductsResponse>>();

  // Apply filters based on search parameters
  const searchWord = searchParams.word ?? '';
  const priceRange = searchParams.price ?? '';
  const selectedPublisher = searchParams.publisher ?? '';
  const selectedCategory = searchParams.category ?? '';

  let filteredBooks = booksData.data.products;

  // Filter by search word
  if (searchWord) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchWord.toLowerCase()),
    );
  }

  // Filter by price range
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    filteredBooks = filteredBooks.filter((book) => {
      const { discountedPrice } = book;
      return discountedPrice >= minPrice && discountedPrice <= maxPrice;
    });
  }

  // Filter by publisher
  if (selectedPublisher) {
    const publishers = selectedPublisher.split(',');
    filteredBooks = filteredBooks.filter((book) => publishers.includes(book.publisher));
  }

  // Filter by category
  if (selectedCategory) {
    const selectedCategories = selectedCategory.split(',')[0];

    filteredBooks = filterBooksByCategoryName(filteredBooks, selectedCategories);
  }

  // TODO: Product에는 tag가 없음
  // Filter by tag
  // if (selectedTag) {
  //   const tags = selectedTag.split(',');
  //   filteredBooks = filteredBooks.filter((book) => tags.some((tag) => book.tags.includes(tag)));
  // }

  return (
    <div className="flex">
      {/* Sidebar with filters */}
      <div className="hidden w-1/5 p-4 lg:block">
        <FilterComponent books={filteredBooks} />
      </div>

      {/* Main content area */}
      <div className="w-full p-4 lg:w-4/5">
        <h1 className="mb-4 text-xl font-bold">상품 목록</h1>

        {/* Render the search results */}
        <SearchResult books={filteredBooks} />
      </div>
    </div>
  );
};

export default SearchPage;
