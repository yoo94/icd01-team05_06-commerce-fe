import { DetailBook } from '@/types/book-types';
import Image from 'next/image';
import Breadcrumb from '@/components/common/breadcrumb';
import { calculationDiscountRate } from '@/lib/utils';
import DetailButtonActions from './components/detail-button-actions';
import BookInfo from './components/book-info/book-info';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StarRating from '@/components/common/star-rating';
import RefundExchangePolicy from './components/refund-exchage-policy';
import ReviewSection from './components/review/review-section';
import api from '@/lib/api';

interface BookDetailsPageProps {
  params: { id: string };
}

// Main Server Component for the Book Details Page
const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const bookId = parseInt(params.id, 10);

  // Fetch Book Data from the API
  const book = await api(`api/books/${bookId}`).json<DetailBook>();

  const originalPrice = Number(book.price).toLocaleString();
  const discountedPrice = Number(book.discount).toLocaleString();
  const discountRate = calculationDiscountRate(book.price, book.discount);

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Breadcrumb category={book.category} />
      <div className="flex">
        {/* Book Image Section */}
        <div className="w-1/3">
          <div className="relative h-48 md:h-80">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              style={{ objectFit: 'fill' }}
              className="rounded-lg"
            />
          </div>
          {/* Button to open preview link */}
          <Button variant="outline" className="w-full border-slate-300">
            <Link href={book.previewLink} target="_blank">
              미리보기
            </Link>
          </Button>
        </div>

        {/* Top Section */}
        <div className="flex w-2/3 flex-col items-start pl-6">
          <div className="flex w-full flex-col gap-y-2 border-b pb-4">
            <div className="flex gap-x-2">
              <div className="border px-2.5 py-1 text-xs font-light">소득공제</div>
              <div className="border px-2.5 py-1 text-xs font-light">무료배송</div>
            </div>
            <h1 className="mb-2 text-lg font-semibold">{book.title}</h1>
            <p className="text-xs font-extralight text-slate-500">
              {book.author} | {book.publisher} | {book.pubdate}
            </p>
            <div className="flex items-center gap-x-2">
              <StarRating rating={book.rating} />
              <span className="font-bold text-gray-500">{book.rating}</span>
            </div>
          </div>

          <div className="mb-6 mt-4">
            {book.discount > 0 ? (
              <div className="py-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-y-2 text-sm">
                  {/* Original Price */}
                  <div className="w-28 font-extralight text-slate-500">정가</div>
                  <div className="text-left font-extrabold line-through">{originalPrice}원</div>
                  {/* Discounted Price */}
                  <div className="w-28 font-extralight text-slate-500">판매가</div>
                  <div className="text-destructive text-left text-base">
                    <span className="font-extrabold">{discountedPrice}원</span>
                    <span className="ml-1 text-xs font-light">({discountRate}%)</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-lg font-semibold text-gray-900">품절</p>
            )}
          </div>

          <div className="grid w-full grid-cols-[120px_1fr] gap-y-2 border-t py-4 text-sm">
            {/* Shipping Information */}
            <div className="font-extralight text-slate-500">배송안내</div>
            <div className="text-left text-sm font-extralight text-slate-500">
              주문 후 2-3일 이내 도착
            </div>
            {/* Shipping Cost */}
            <div className="font-extralight text-slate-500">배송비</div>
            <div className="text-left text-sm font-extralight text-slate-500">무료배송</div>
          </div>
        </div>

        {/* Cart Actions Section */}
        <div className="ml-6 w-1/4">
          <DetailButtonActions book={book} />
        </div>
      </div>

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
