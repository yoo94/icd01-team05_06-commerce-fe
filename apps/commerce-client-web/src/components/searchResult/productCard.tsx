import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 훅 가져오기
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  onAddToCart: () => void;
  onBuyNow: () => void; // 바로 구매 기능 추가
}

function ProductCard({ id, imageUrl, title, price, onAddToCart, onBuyNow }: ProductCardProps) {
  const router = useRouter(); // useRouter 훅 사용

  const handleNavigate = () => {
    router.push(`/details/${id}`);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex cursor-pointer" // 여기 추가
      onClick={handleNavigate}
    >
      {/* Left Side: Image */}
      <div className="relative w-24 h-32 flex-shrink-0">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-lg" />
      </div>

      {/* Center: Title, Price, Tags */}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">{price}</p>
        <div className="flex space-x-2 mt-2">
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">#개발개념 원리</span>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">#개발의 정석</span>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">#코딩입문</span>
        </div>
      </div>

      {/* Right Side: Buttons */}
      <div className="ml-auto flex flex-col items-end space-y-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          variant="default"
        >
          카트에 넣기
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBuyNow();
          }}
          variant="destructive"
        >
          바로구매
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
