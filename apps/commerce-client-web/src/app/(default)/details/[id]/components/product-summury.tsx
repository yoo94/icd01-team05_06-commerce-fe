import StarRating from '@/components/common/star-rating';
import { Button } from '@/components/ui/button';
import { parseAndRoundPrice, calculationDiscountRate } from '@/lib/utils';
import { Product } from '@/types/product-types';
import Image from 'next/image';
import Link from 'next/link';
import DetailButtonActions from './detail-button-actions';

interface ProductSummuryProps {
  book: Product;
}

const ProductSummury = ({ book }: ProductSummuryProps) => {
  const originalPrice = parseAndRoundPrice(book.price);
  const discountedPrice = parseAndRoundPrice(book.discountedPrice);
  const discountRate = calculationDiscountRate(book.price, book.discountedPrice);

  return (
    <div className="flex">
      <div className="flex w-1/3 flex-col gap-y-4">
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
        <Button asChild variant="outline" className="w-full border-slate-300">
          <Link href={book.previewLink} target="_blank">
            미리보기
          </Link>
        </Button>
      </div>

      <div className="flex w-2/3 flex-col items-start pl-6">
        <div className="flex w-full flex-col gap-y-2 border-b pb-4">
          <div className="flex gap-x-2">
            <div className="border px-2.5 py-1 text-xs font-light">소득공제</div>
            <div className="border px-2.5 py-1 text-xs font-light">무료배송</div>
          </div>
          <h1 className="mb-2 text-lg font-semibold">{book.title}</h1>
          <p className="text-xs font-extralight text-slate-500">
            {book.author} | {book.publisher} | {book.publishDate}
          </p>
          <div className="flex items-center gap-x-2">
            <StarRating rating={book.rating} />
            <span className="font-bold text-gray-500">{book.rating}</span>
          </div>
        </div>
        <div className="mb-6 mt-4">
          {book.price > book.discountedPrice ? (
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

      <div className="ml-6 w-1/4">
        <DetailButtonActions book={book} />
      </div>
    </div>
  );
};

export default ProductSummury;
