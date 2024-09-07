import React from 'react';
import { CartItem } from '@/types/carttypes';
import usecartstore from '@/stores/usecartstore';

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = () => {
  const { items } = usecartstore();
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + parseInt(item.price) * item.selectNum, 0)
    .toLocaleString();

  return (
    <div className="mt-8 flex justify-end">
      <div className="text-right">
        <div className="mb-2 text-lg font-semibold">
          총 주문 상품 {items.filter((item) => item.selected).length}개
        </div>
        <div className="text-2xl font-bold">{totalPrice}원</div>
      </div>
    </div>
  );
};

export default CartSummary;
