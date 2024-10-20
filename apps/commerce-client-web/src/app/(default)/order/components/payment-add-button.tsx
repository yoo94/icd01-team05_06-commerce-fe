'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { useRouter } from 'next/navigation';
import AlertDialogComponent from '@/components/common/alert-dialog';
import { Product } from '@/types/product-types';

interface PaymentForOrderButtonProps {
  text: string;
  book?: Product;
}

const PaymentAddButton = ({ text, book }: PaymentForOrderButtonProps) => {
  const router = useRouter();
  const { addItemToCart } = useCartStore();
  const [showDialog, setShowDialog] = useState(false);
  const queryString = `productId=${book?.id}&quantity=${1}`;

  const buyOnlyOneBook = () => {
    router.push(`/order?${queryString}`);
  };

  const goPayment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (book && book.discountedPrice < 1) {
      alert('품절상품입니다');
      return;
    }

    const currentPath = window.location.pathname;
    /**
     * todo
     * 장바구니 상품조회를 여기에하면 너무 많은 리소스를 차지해서 추후에 다시 구현해보겠습니다.
     */
    const selectedProducts = [];

    if (currentPath === '/cart' && selectedProducts.length > 0) {
      router.push(`/order?${queryString}`);
    } else if (book) {
      if (selectedProducts.length > 0) {
        setShowDialog(true);
      } else {
        buyOnlyOneBook();
      }
    } else {
      alert('상품을 선택해주세요.');
    }
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    if (!book) return;
    addItemToCart(book.id, 1);
    router.push('/cart');
  };

  const handleDialogBuyJustOne = () => {
    setShowDialog(false);
    if (!book || !book.id) return;
    buyOnlyOneBook();
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Button onClick={goPayment} className="w-full">
        {text}
      </Button>

      {/* 함께 구매 여부 확인을 위한 다이얼로그 */}
      {showDialog && (
        <AlertDialogComponent
          title="장바구니에 상품이 있습니다"
          description="장바구니 확인 후 함께 구매하시겠습니까?"
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
          thirdButtonName={'바로구매'}
          onThirdAction={handleDialogBuyJustOne}
        />
      )}
    </>
  );
};

export default PaymentAddButton;
