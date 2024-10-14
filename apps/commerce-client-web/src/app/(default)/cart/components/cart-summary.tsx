'use client';

import { useEffect, useState } from 'react';
import { Equal, Minus, Plus } from 'lucide-react';
import useCartStore from '@/stores/use-cart-store';

const CartSummary = () => {
  const { items, checkedItems } = useCartStore();

  const [totalItemPrice, setTotalItemPrice] = useState('0');
  const [totalDiscount, setTotalDiscount] = useState('0');
  const [finalPrice, setFinalPrice] = useState('0');

  useEffect(() => {
    const selectedItems = items.filter((item) => checkedItems.includes(item.productId));

    const safeParseNumber = (value: number | string | undefined) => {
      const parsedValue = Number(value);
      return isNaN(parsedValue) ? 0 : parsedValue; // NaN이면 0을 반환
    };

    const totalItemPriceCalc = selectedItems
      .reduce((acc, item) => acc + safeParseNumber(item.price) * item.quantity, 0)
      .toLocaleString();

    const totalDiscountCalc = selectedItems
      .reduce(
        (acc, item) =>
          acc +
          safeParseNumber(safeParseNumber(item.price) - safeParseNumber(item.discountedPrice)) *
            item.quantity,
        0,
      )
      .toLocaleString();

    const finalPriceCalc = selectedItems
      .reduce(
        (acc, item) =>
          acc +
          (safeParseNumber(item.price) -
            safeParseNumber(item.price - safeParseNumber(item.discountedPrice))) *
            item.quantity,
        0,
      )
      .toLocaleString();

    // 계산된 값 상태로 설정
    setTotalItemPrice(totalItemPriceCalc);
    setTotalDiscount(totalDiscountCalc);
    setFinalPrice(finalPriceCalc);
  }, [items, checkedItems]); // items와 checkedItems가 변경될 때마다 실행

  return (
    <div className="mt-8 w-full">
      <h2 className="mb-4 text-lg font-semibold">결제정보</h2>
      <div className="rounded-md border border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-4 bg-slate-100 p-4 text-center text-sm font-semibold text-gray-700">
          {/* 총 상품금액 */}
          <div className="relative">
            <span>총 상품금액</span>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                <Plus size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* 총 추가금액 */}
          <div className="relative">
            <span>총 추가금액</span>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                <Minus size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* 총 할인금액 */}
          <div className="relative text-blue-500">
            <span>총 할인금액</span>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                <Equal size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* 최종 결제금액 */}
          <div className="relative text-red-700">
            <span>최종 결제금액</span>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="grid grid-cols-4 gap-4 p-4 text-center text-lg font-bold">
          <div>{totalItemPrice}원</div>
          <div>0원</div>
          {/* 추가금액은 0으로 설정 */}
          <div>{totalDiscount}원</div>
          <div className="text-red-600">{finalPrice}원</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
