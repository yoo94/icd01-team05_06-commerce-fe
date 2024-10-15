import Breadcrumb from '@/components/common/breadcrumb';
import BookInfo from './components/book-info/book-info';
import RefundExchangePolicy from './components/refund-exchage-policy';
import ReviewSection from './components/review/review-section';
import { fetchProductById } from '@/app/actions/product-action';
import ProductSummury from './components/product-summury';

interface BookDetailsPageProps {
  params: { id: string };
}

// Main Server Component for the Book Details Page
const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const bookId = parseInt(params.id, 10);

  const book = await fetchProductById(bookId);

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Breadcrumb category={book.category} />

      <ProductSummury book={book} />

      {/* Bottom Section */}
      <div className="mt-8 border-t pt-4">
        <BookInfo book={book} />
        <ReviewSection id={book.id} />
        <RefundExchangePolicy />
      </div>
    </div>
  );
};

export default BookDetailsPage;
