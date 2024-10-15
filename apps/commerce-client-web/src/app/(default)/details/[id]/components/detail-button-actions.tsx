'use client';

import { useState } from 'react';
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';
import PaymentAddButton from '@/app/(default)/order/components/payment-add-button';
import { Product } from '@/types/product-types';

interface CartActionsProps {
  book: Product;
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
      <div className="flex flex-col gap-y-2">
        <AddToCartButton book={book} quantity={quantity} />
        <PaymentAddButton text={'바로구매'} book={book} />
      </div>
    </div>
  );
};

export default DetailButtonActions;
