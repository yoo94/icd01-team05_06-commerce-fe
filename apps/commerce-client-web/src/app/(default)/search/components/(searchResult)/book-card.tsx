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
  const maxLength = 70; // 최대 출력할 글자 수

  const roundedPrice = parseAndRoundPrice(book.price); // 유틸리티 함수 사용

  const handleNavigate = () => {
    router.push(`/details/${id}`);
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
  };

  return (
    <div className="hover:border-primary flex w-full shrink cursor-pointer flex-col rounded-md border p-4 shadow-sm hover:shadow-md sm:w-auto md:flex-row">
      <>
        <div className="flex" onClick={handleNavigate}>
          {/* Left Side: Image */}
          <div className="relative h-44 w-32 shrink-0">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          {/* Center: Title, Price, Tags */}
          <div className="mx-4 flex grow flex-col justify-between">
            <div className="flex flex-col gap-y-1.5 py-2">
              <h2 className="max-w-96 truncate text-sm font-semibold">{book.title}</h2>
              <p className="text-xs font-light text-slate-600">
                {book.author} | {book.publisher} | {book.publishDate}
              </p>
              <p className="mt-2 text-sm">
                {book.price > book.discountedPrice ? (
                  <>
                    <span className="mr-1 font-extrabold">
                      {book.discountedPrice.toLocaleString()}원
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {roundedPrice.toLocaleString()}원
                    </span>
                  </>
                ) : (
                  <span className="font-bold">품절</span>
                )}
              </p>
              <p className="hidden text-xs font-light text-slate-500 md:block">
                {truncateDescription(book.description, maxLength)}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {/*{book.tags.map((tag, index) => (*/}
              {/*  <span*/}
              {/*    key={index}*/}
              {/*    className="gap-2 rounded bg-slate-100 px-2 py-1 text-xs font-light text-slate-400"*/}
              {/*  >*/}
              {/*    #{tag}*/}
              {/*  </span>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
      </>
      {/* Right Side: Buttons */}
      <div className="mt-4 flex flex-row items-end justify-around space-y-2 md:ml-auto md:mt-0 md:flex-col md:justify-start">
        <AddToCartButton book={book} quantity={1} />
        <PaymentAddButton text={'바로구매'} book={book} />
      </div>
    </div>
  );
};

export default BookCard;
