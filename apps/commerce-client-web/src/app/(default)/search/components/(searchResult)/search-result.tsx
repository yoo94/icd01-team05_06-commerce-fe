import BookCard from './book-card';
import { Book } from '@/types/book-types';

// SearchResultProps 타입 정의
export type SearchResultProps = {
  books: Book[];
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
