import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 훅 가져오기
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product-types';
import { parseAndRoundPrice } from '@/lib/utils';
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';

// ProductCardProps 타입 정의
export type ProductCardProps = {
  id: number;
  product: Product;
  onBuyNow: () => void;
};

const ProductCard = ({ id, product, onBuyNow }: ProductCardProps) => {
  const router = useRouter(); // useRouter 훅 사용
  const maxLength = 70; // 최대 출력할 글자 수

  const roundedPrice = parseAndRoundPrice(product.price); // 유틸리티 함수 사용

  const handleNavigate = () => {
    router.push(`/details/${id}`);
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
  };

  return (
    <div
      className="hover:border-primary flex w-full shrink cursor-pointer flex-col rounded-md border p-4 shadow-sm hover:shadow-md sm:w-auto md:flex-row" // flex-wrap과 w-full 추가
      onClick={handleNavigate}
    >
      <div className="flex">
        {/* Left Side: Image */}
        <div className="relative h-44 w-32 shrink-0">
          <Image
            src={product.coverImage}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>

        {/* Center: Title, Price, Tags */}
        <div className="mx-4 flex grow flex-col justify-between">
          <div className="flex flex-col gap-y-1.5 py-2">
            <h2 className="max-w-96 truncate text-sm font-semibold">{product.title}</h2>
            <p className="text-xs font-light text-slate-600">
              {product.author} | {product.publisher} | {product.pubdate}
            </p>
            <p className="mt-2 text-sm">
              {product.discount > 0 ? (
                <>
                  <span className="mr-1 font-extrabold">{product.discount.toLocaleString()}원</span>
                  <span className="text-xs text-slate-400 line-through">
                    {roundedPrice.toLocaleString()}원
                  </span>
                </>
              ) : (
                <span className="font-bold">품절</span>
              )}
            </p>
            <p className="hidden text-xs font-light text-slate-500 md:block">
              {truncateDescription(product.description, maxLength)}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="gap-2 rounded bg-slate-100 px-2 py-1 text-xs font-light text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side: Buttons */}
      <div className="mt-4 flex flex-row items-end justify-around space-y-2 md:ml-auto md:mt-0 md:flex-col md:justify-start">
        <AddToCartButton product={product} />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBuyNow();
          }}
          variant="default"
          className="w-24"
        >
          바로구매
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
