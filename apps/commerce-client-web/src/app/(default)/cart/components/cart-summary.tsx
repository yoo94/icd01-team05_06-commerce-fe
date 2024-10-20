'use client';

import { useEffect, useState } from 'react';
import useCartStore from '@/stores/use-cart-store';
import { Button } from '@/components/ui/button';
import AlertDialog from '@/components/common/alert-dialog';
import { useRouter } from 'next/navigation';

const CartSummary = () => {
  const { items, checkedItems } = useCartStore();
  const [totalItemPrice, setTotalItemPrice] = useState('0');
  const [totalDiscount, setTotalDiscount] = useState('0');
  const [finalPrice, setFinalPrice] = useState('0');
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const selectedItems = items.filter((item) => checkedItems.includes(item.productId));

    const totalItemPriceCalc = selectedItems
      .reduce((acc, item) => acc + item.price, 0)
      .toLocaleString();

    const totalDiscountCalc = selectedItems
      .reduce((acc, item) => acc + item.price - item.discountedPrice, 0)
      .toLocaleString();

    const finalPriceCalc = selectedItems
      .reduce((acc, item) => acc + item.discountedPrice, 0)
      .toLocaleString();

    setTotalItemPrice(totalItemPriceCalc);
    setTotalDiscount(totalDiscountCalc);
    setFinalPrice(finalPriceCalc);
  }, [items, checkedItems]);

  const handleOrderClick = () => {
    if (Number(finalPrice.replace(/,/g, '')) === 0) {
      setShowAlertDialog(true);
    } else {
      const selectedItems = items.filter((item) => checkedItems.includes(item.productId));

      const queryString = selectedItems
        .map((item) => `productId=${item.productId}&quantity=${item.quantity}`)
        .join('&');

      router.push(`/order?${queryString}`);
    }
  };

  return (
    <>
      {/* Desktop Design */}
      <div className="mt-8 hidden w-full md:block">
        <h2 className="mb-4 text-lg font-semibold md:text-left">결제정보</h2>
        <div className="rounded-md border border-gray-200 p-4">
          <div className="grid grid-cols-4 gap-4 bg-slate-100 p-4 text-center text-sm font-semibold text-gray-700">
            <div>총 상품금액</div>
            <div>총 추가금액</div>
            <div className="text-blue-500">총 할인금액</div>
            <div className="text-red-700">최종 결제금액</div>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4 text-center text-lg font-bold">
            <div>{totalItemPrice}원</div>
            <div>0원</div>
            <div>{totalDiscount}원</div>
            <div className="text-red-600">{finalPrice}원</div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button onClick={handleOrderClick} className="h-14 w-full text-lg font-semibold">
            주문하기
          </Button>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="mt-8 block w-full md:hidden">
        <h2 className="mb-4 text-lg font-semibold">결제정보</h2>
        <div className="rounded-md border border-gray-200 bg-slate-50 p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>총 상품금액</span>
              <span>{totalItemPrice}원</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-blue-500">
              <span>총 할인금액</span>
              <span>{totalDiscount}원</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>총 추가금액</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between border-t pt-4 text-lg font-bold text-red-600">
              <span>최종 결제금액</span>
              <span>{finalPrice}원</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleOrderClick} className="h-12 w-full text-base font-semibold">
            주문하기
          </Button>
        </div>
      </div>

      {/* AlertDialog Component */}
      {showAlertDialog && (
        <AlertDialog
          title="경고"
          description="최종 결제 금액이 0원입니다. 구매하실 상품을 선택해주세요."
          onConfirm={() => setShowAlertDialog(false)}
        />
      )}
    </>
  );
};

export default CartSummary;
