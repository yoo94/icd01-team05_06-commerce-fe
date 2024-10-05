import BookContentSection from './book-content-section';
import BookDetails from './book-details';
import { Product } from '@/types/product-types';

type InfoProps = {
  book: Product;
};

const BookInfo = ({ book }: InfoProps) => {
  return (
    <div>
      <BookDetails book={book} />
      {/*<BookContentSection title="목차" content={book.tableOfContents} />*/}
      <BookContentSection title="작가정보" content={book.author} />
      {/*<BookContentSection title="추천평" content={book.recommendations} />*/}
    </div>
  );
};

export default BookInfo;
