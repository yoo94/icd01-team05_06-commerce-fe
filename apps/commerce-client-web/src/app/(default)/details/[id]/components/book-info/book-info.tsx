import BookContentSection from './book-content-section';
import BookDetails from './book-details';

import { DetailBook } from '@/types/book-types';

type InfoProps = {
  book: DetailBook;
};

const BookInfo = ({ book }: InfoProps) => {
  return (
    <div>
      <BookDetails book={book} />
      <BookContentSection title="목차" content={book.tableOfContents} />
      <BookContentSection title="작가정보" content={book.authorInfo} />
      <BookContentSection title="추천평" content={book.recommendations} />
    </div>
  );
};

export default BookInfo;
