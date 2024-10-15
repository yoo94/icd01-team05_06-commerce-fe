'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 훅 가져오기
import { parseAndRoundPrice } from '@/lib/utils';
import { Product } from '@/types/product-types'; // Import the useCartStore hook
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';
import PaymentAddButton from '@/app/(default)/order/components/payment-add-button';

export type BookCardProps = {
  id: number;
  book: Product;
};

const BookCard = ({ id, book }: BookCardProps) => {
  const router = useRouter(); // useRouter 훅 사용
  const maxLength = 100; // 최대 출력할 글자 수

  const roundedPrice = parseAndRoundPrice(book.price); // 유틸리티 함수 사용

  const handleNavigate = () => {
    router.push(`/details/${id}`);
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
  };

  return (
    <div className="hover:border-primary flex w-full max-w-sm shrink cursor-pointer flex-col overflow-hidden rounded-md border p-4 shadow-sm hover:shadow-md sm:max-w-full sm:flex-row sm:justify-between lg:max-w-[750px]">
      <div className="flex flex-col gap-y-4 sm:flex-row" onClick={handleNavigate}>
        {/* Left Side: Image */}
        <div className="relative h-44 w-full shrink-0 sm:h-44 sm:w-32 lg:h-48 lg:w-40">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>

        {/* Center: Title, Price, Description */}
        <div className="mx-4 flex grow flex-col gap-y-2 overflow-hidden">
          <h2 className="max-w-[280px] truncate text-sm font-semibold lg:max-w-[400px] lg:text-lg">
            {book.title}
          </h2>
          <p className="truncate text-xs font-light text-slate-600 lg:text-sm">
            {book.author} | {book.publisher} | {book.publishDate}
          </p>
          <p className="mt-2 truncate text-sm md:max-w-[280px] lg:max-w-[400px]">
            {book.price > book.discountedPrice ? (
              <>
                <span className="mr-1 font-extrabold lg:text-base">
                  {book.discountedPrice.toLocaleString()}원
                </span>
                <span className="text-xs text-slate-400 line-through lg:text-sm">
                  {roundedPrice.toLocaleString()}원
                </span>
              </>
            ) : (
              <span className="font-bold lg:text-base">품절</span>
            )}
          </p>
          <p className="hidden text-xs font-light text-slate-500 md:block md:max-w-[280px] lg:max-w-[400px] lg:text-sm">
            {truncateDescription(book.description, maxLength)}
          </p>
        </div>
      </div>

      {/* Right Side: Buttons */}
      <div className="mt-4 flex flex-row items-end justify-around gap-2 sm:mt-0 sm:flex-col sm:items-start sm:justify-start sm:space-y-0">
        <AddToCartButton book={book} quantity={1} />
        <PaymentAddButton text={'바로구매'} book={book} />
      </div>
    </div>
  );
};

export default BookCard;
