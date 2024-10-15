'use client';

import { useState } from 'react';
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';
import PaymentAddButton from '@/app/(default)/order/components/payment-add-button';
import { Product } from '@/types/product-types';

interface CartActionsProps {
  book: Product;
}

const PurchaseActions = ({ book }: CartActionsProps) => {
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
    <div className="flex flex-col gap-y-4 rounded-lg border p-4 shadow-sm">
      {/* 수량 조절 섹션 */}
      <div className="flex w-full items-center justify-between md:w-auto">
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200 disabled:opacity-50"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 text-lg">{quantity}</span>
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>

      {/* 장바구니와 결제 버튼 섹션 */}
      <div className="flex flex-col gap-y-2">
        <AddToCartButton book={book} quantity={quantity} />
        <PaymentAddButton text="바로구매" book={book} />
      </div>
    </div>
  );
};

export default PurchaseActions;
