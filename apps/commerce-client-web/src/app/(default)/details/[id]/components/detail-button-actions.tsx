'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book-types';
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';

interface CartActionsProps {
  book: Book;
}

const DetailButtonActions = ({ book }: CartActionsProps) => {
  // 수량을 로컬 상태로 관리
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
      {/* AddToCartButton에 로컬 상태 quantity를 전달 */}
      <AddToCartButton book={book} quantity={quantity} />
      <Button className="mt-2.5 w-full">바로구매</Button>
    </div>
  );
};

export default DetailButtonActions;
