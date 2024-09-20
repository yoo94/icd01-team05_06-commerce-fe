import { Book } from '@/types/book-types';
import FilterComponent from './components/(filters)/filter-component';
import SearchResult from './components/(searchResult)/search-result';
import { filterBooksByCategoryName } from '@/lib/utils';
import api from '@/lib/api';

interface SearchPageProps {
  searchParams: {
    word?: string;
    price?: string;
    publisher?: string;
    category?: string;
    tag?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const booksData = await api.get('api/books').json<Book[]>();

  // Apply filters based on search parameters
  const searchWord = searchParams.word ?? '';
  const priceRange = searchParams.price ?? '';
  const selectedPublisher = searchParams.publisher ?? '';
  const selectedCategory = searchParams.category ?? '';
  const selectedTag = searchParams.tag ?? '';

  let filteredBooks = booksData;

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
      const discountedPrice = book.price - (book.discount ?? 0); // Calculate discounted price
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

  // Filter by tag
  if (selectedTag) {
    const tags = selectedTag.split(',');
    filteredBooks = filteredBooks.filter((book) => tags.some((tag) => book.tags.includes(tag)));
  }

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
