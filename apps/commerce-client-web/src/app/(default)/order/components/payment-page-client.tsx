'use client';

import React, { useEffect, useState } from 'react';
import PaymentProducts from '@/app/(default)/order/components/payment-products';
import PaymentSummary from '@/app/(default)/order/components/payment-summary';
import OrderShippingInfo from '@/app/(default)/order/components/payment-shippinginfo';
import OrderPaymentMethod from '@/app/(default)/order/components/payment-method';
import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';
import PaymentUserInfo from '@/app/(default)/order/components/payment-userInfo';
import useCartStore from '@/stores/use-cart-store';
import { CartItem } from '@/types/cart-types';

interface PaymentPageClientProps {
  serverBooks: CartItem[];
}

const PaymentPageClient = ({ serverBooks }: PaymentPageClientProps) => {
  const { getSelectedBook, items } = useCartStore();
  const [books, setBooks] = useState<CartItem[]>([]);

  useEffect(() => {
    if (serverBooks.length > 0) {
      // 서버에서 전달된 데이터가 있으면 사용
      setBooks(serverBooks);
    } else {
      // 서버에서 데이터가 없으면 클라이언트 상태에서 가져옴
      setBooks(getSelectedBook());
    }
  }, [serverBooks, getSelectedBook, items]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-left text-xl font-semibold">결제 정보</h1>

      {/* 그리드 설정: 기본 1열, md(768px) 이상 2열 */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* 주문 상품 정보 */}
        <PaymentProducts books={books} />

        {/* 주문 요약 */}
        <PaymentSummary books={books} />

        {/* 주문자 정보 */}
        <PaymentUserInfo />

        {/* 배송 정보 */}
        <OrderShippingInfo />

        {/* 결제수단 */}
        <OrderPaymentMethod />

        {/* 동의 및 결제하기 */}
        <PaymentAgreement />
      </div>
    </div>
  );
};

export default PaymentPageClient;
