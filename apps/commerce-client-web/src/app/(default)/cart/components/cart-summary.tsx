'use client';

import { useEffect, useState } from 'react';
import { Equal, Minus, Plus } from 'lucide-react';
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
      sessionStorage.setItem('selectedItems', JSON.stringify(checkedItems));
      router.push('/order');
    }
  };

  return (
    <>
      <div className="mt-8 w-full">
        <h2 className="mb-4 text-lg font-semibold">결제정보</h2>
        <div className="rounded-md border border-gray-200 p-4">
          <div className="grid grid-cols-4 gap-4 bg-slate-100 p-4 text-center text-sm font-semibold text-gray-700">
            <div className="relative">
              <span>총 상품금액</span>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                  <Plus size={16} className="text-white" />
                </div>
              </div>
            </div>

            <div className="relative">
              <span>총 추가금액</span>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                  <Minus size={16} className="text-white" />
                </div>
              </div>
            </div>

            <div className="relative text-blue-500">
              <span>총 할인금액</span>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className="flex size-5 items-center justify-center rounded-full bg-slate-400">
                  <Equal size={16} className="text-white" />
                </div>
              </div>
            </div>

            <div className="relative text-red-700">
              <span>최종 결제금액</span>
            </div>
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

      {/* AlertDialogComponent */}
      {showAlertDialog && (
        <AlertDialog
          title="경고"
          description="최종 결제 금액이 0원입니다. 구매하실 상품을 선택해주세요."
          onConfirm={() => setShowAlertDialog(false)} // 확인 버튼 클릭 시 다이얼로그 닫기
        />
      )}
    </>
  );
};

export default CartSummary;
