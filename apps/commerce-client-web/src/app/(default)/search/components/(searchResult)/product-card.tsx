import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 훅 가져오기
import { Button } from '@/components/ui/button';

// ProductCardProps 타입 정의
export type ProductCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number; // 또는 number (parseAndRoundPrice 함수가 문자열을 반환하는 경우 string 사용)
  description: string;
  discount: number;
  tags: string[];
  onAddToCart: () => void;
  onBuyNow: () => void;
};

const ProductCard = ({
  id,
  imageUrl,
  title,
  price,
  description,
  discount,
  tags = [], // tags에 기본값으로 빈 배열을 설정
  onAddToCart,
  onBuyNow,
}: ProductCardProps) => {
  const router = useRouter(); // useRouter 훅 사용
  const maxLength = 70; // 최대 출력할 글자 수

  const handleNavigate = () => {
    router.push(`/details/${id}`);
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
  };

  return (
    <div
      className="border rounded-md p-4 shadow-sm hover:shadow-md flex flex-col flex-shrink cursor-pointer w-full sm:w-auto hover:border-primary md:flex-row" // flex-wrap과 w-full 추가
      onClick={handleNavigate}
    >
      <div className="flex">
        <div className="h-100 mr-4 flex align-center items-center">{id}</div>
        {/* Left Side: Image */}
        <div className="relative w-24 h-32 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Center: Title, Price, Tags */}
        <div className="flex flex-col justify-between ml-4 mr-4 flex-grow">
          <h2 className="font-semibold">{title}</h2>
          <h2 className="text-sm text-slate-500 hidden md:block">
            {truncateDescription(description, maxLength)}
          </h2>
          <p className="text-gray-500">
            {discount > 0 ? (
              <>
                <span className="font-bold mr-2 text-black">{discount.toLocaleString()}원</span>
                <span className="line-through text-slate-300">{price.toLocaleString()}원</span>
              </>
            ) : (
              <span className="text-black font-bold">품절</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="text-sm bg-gray-200 px-2 py-1 gap-2 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side: Buttons */}
      <div className="flex flex-row items-end space-y-2 justify-around mt-4 md:justify-start md:flex-col md:ml-auto md:mt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          variant="secondary"
          className="w-24"
        >
          카트에 넣기
        </Button>
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
