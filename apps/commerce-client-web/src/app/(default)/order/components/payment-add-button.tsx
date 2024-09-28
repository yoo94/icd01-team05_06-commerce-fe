'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { useRouter } from 'next/navigation';
import AlertDialogComponent from '@/components/common/alert-dialog';
import { Product } from '@/types/product-types'; // 경고 다이얼로그

interface PaymentForOrderButtonProps {
  text: string;
  book?: Product;
}

const PaymentAddButton = ({ text, book }: PaymentForOrderButtonProps) => {
  const router = useRouter();
  const getSelectedProduct = useCartStore((state) => state.getSelectedBook);
  const addBook = useCartStore((state) => state.addBook);
  const [showDialog, setShowDialog] = useState(false);

  const goPayment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    // TODO: 품절 여부 조건 재확인 필요
    // 품절된 상품인지 확인
    if (book && book.discountedPrice < 1) {
      alert('품절상품입니다');
      return;
    }

    const currentPath = window.location.pathname;
    const selectedProducts = getSelectedProduct();

    // 장바구니에서 구매하는 경우
    if (currentPath === '/cart' && selectedProducts.length > 0) {
      router.push('/order');
    }
    // 책이 있는 경우 다이얼로그를 띄움
    else if (book) {
      if (selectedProducts.length > 0) {
        setShowDialog(true); // 다이얼로그 띄우기
      } else {
        router.push(`/order?productId=${book.id}`); // 바로 구매
      }
    }
    // 상품이 없는 경우
    else {
      alert('상품을 선택해주세요.');
    }
  };

  // 장바구니 상품과 함께 구매
  const handleDialogConfirm = () => {
    setShowDialog(false); // 다이얼로그 닫기
    if (!book) return;
    addBook(book); // 선택한 책을 장바구니에 추가
    router.push('/cart'); // 결제 페이지로 이동
  };

  // 선택한 상품만 바로 구매
  const handleDialogBuyJustOne = () => {
    setShowDialog(false); // 다이얼로그 닫기
    if (!book || !book.id) return;
    router.push(`/order?productId=${book.id}`); // 해당 책만 결제
  };

  // 취소 동작, 다이얼로그만 닫고 페이지 이동 없음
  const handleDialogCancel = () => {
    setShowDialog(false); // 다이얼로그 닫기만 함
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
