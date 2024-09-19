'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { useRouter } from 'next/navigation';
import { Book } from '@/types/book-types';
import AlertDialogComponent from '@/components/common/alert-dialog'; // 경고 다이얼로그

interface PaymentForOrderButtonProps {
  text: string;
  book?: Book;
}

const PaymentAddButton = ({ text, book }: PaymentForOrderButtonProps) => {
  const router = useRouter();
  const getSelectedProduct = useCartStore((state) => state.getSelectedBook);
  const addBook = useCartStore((state) => state.addBook);
  const [showDialog, setShowDialog] = useState(false);

  const goPayment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    // 품절된 상품인지 확인
    if (book && book.discount < 1) {
      alert('품절상품입니다');
      return;
    }

    const currentPath = window.location.pathname;
    const selectedProducts = getSelectedProduct();

    if (currentPath === '/cart' && selectedProducts.length > 0) {
      if (selectedProducts.length > 0) {
        router.push('/order');
      } else {
        alert('장바구니에서 상품을 선택해주세요.');
      }
    } else if (book) {
      if (selectedProducts.length > 0) {
        setShowDialog(true);
      } else {
        router.push(`/order?productId=${book.id}`);
      }
    } else {
      alert('상품을 선택해주세요.');
    }
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    if (!book) return;
    addBook(book);
    router.push('/order');
  };
  const handleDialogBuyJustOne = () => {
    setShowDialog(false);
    if (!book || !book.id) return;
    router.push(`/order?productId=${book.id}`);
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
          description="장바구니에 담긴 상품과 함께 구매하시겠습니까?"
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
