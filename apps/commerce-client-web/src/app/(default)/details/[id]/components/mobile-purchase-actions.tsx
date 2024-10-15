'use client';

import { useState } from 'react';
import AddToCartButton from '@/app/(default)/cart/components/cart-add-button';
import PaymentAddButton from '@/app/(default)/order/components/payment-add-button';
import { Product } from '@/types/product-types';

interface MobilePurchaseActionsProps {
  book: Product;
}

const MobilePurchaseActions = ({ book }: MobilePurchaseActionsProps) => {
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
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border bg-white p-4 md:hidden">
      <div className="flex items-center">
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
      <div className="flex gap-x-4">
        <AddToCartButton book={book} quantity={quantity} />
        <PaymentAddButton text="바로구매" book={book} />
      </div>
    </div>
  );
};

export default MobilePurchaseActions;
