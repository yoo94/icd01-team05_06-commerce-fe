'use client';

import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { useRouter } from 'next/navigation';
import { Book } from '@/types/book-types';

interface PaymentForOrderButtonProps {
  text: string;
  book?: Book;
}
const PaymentAddButton = ({ text, book }: PaymentForOrderButtonProps) => {
  const router = useRouter();
  const getSelectedProduct = useCartStore((state) => state.getSelectedBook);

  const goPayment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    // product가 존재하고 discount 속성이 있는지 확인
    if (book && book.discount < 1) {
      alert('품절상품입니다');
      return;
    }

    const currentPath = window.location.pathname;
    const selectedProducts = getSelectedProduct();

    if (currentPath === '/cart') {
      if (selectedProducts.length > 0) {
        router.push('/order');
      } else {
        alert('장바구니에서 상품을 선택해주세요.');
      }
    } else if (book) {
      router.push(`/order?productId=${book.id}`);
    } else {
      alert('상품을 선택해주세요.');
    }
  };

  return (
    <Button onClick={goPayment} className="w-full">
      {text}
    </Button>
  );
};

export default PaymentAddButton;
