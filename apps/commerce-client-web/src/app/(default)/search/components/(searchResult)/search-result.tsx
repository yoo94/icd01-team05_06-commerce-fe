import BookCard from './book-card';
import { Product } from '@/types/product-types';

// SearchResultProps 타입 정의
export type SearchResultProps = {
  books: Product[];
};

const SearchResult = ({ books }: SearchResultProps) => {
  return (
    <div className="space-y-4">
      {books.map((book) => {
        return <BookCard key={book.id} id={book.id} book={book} />;
      })}
    </div>
  );
};

export default SearchResult;
