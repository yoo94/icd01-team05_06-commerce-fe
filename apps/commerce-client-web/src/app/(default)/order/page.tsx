'use client';

import React, { useState, useEffect } from 'react';
import PaymentProducts from './components/payment-products';
import PaymentSummary from './components/payment-summary';
import OrderShippingInfo from './components/payment-shippinginfo';
import OrderPaymentMethod from './components/payment-method';
import PaymentAgreement from './components/payment-agreement';
import PaymentUserInfo from './components/payment-userInfo';
import useCartStore from '@/stores/use-cart-store';
import { CartItem } from '@/types/cart-types';

const mockUser = {
  name: '유재석',
  phnum: '01024129368',
  email: 'ddd@naver.com',
};

const mockOrder = {
  name: '패스트파이브',
  phnum: '01024129368',
  address: '서울',
  detailAddress: '강남구',
  memo: '놓고 가주세여',
};

const PaymentPage = () => {
  const { getSelectedBook, items } = useCartStore();
  const [books, setBooks] = useState<CartItem[]>([]);
  const [user, setUser] = useState(mockUser);
  const [order, setOrder] = useState(mockOrder);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('productId');

    if (productId) {
      const id = Number(productId);
      const product = items.find((item) => item.id === id);
      if (product) setBooks([product]);
    } else {
      setBooks(getSelectedBook());
    }
  }, [getSelectedBook, items]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-center text-2xl font-semibold">결제하기</h1>

      {/* 그리드 설정: 기본 1열, md(768px) 이상 2열 */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* 주문 상품 정보 */}
        <PaymentProducts books={books} />

        {/* 주문 요약 */}
        <PaymentSummary books={books} />

        {/* 주문자 정보 */}
        <PaymentUserInfo user={user} onUserChange={handleUserChange} />

        {/* 배송 정보 */}
        <OrderShippingInfo order={order} onOrderChange={handleOrderChange} />

        {/* 결제수단 */}
        <OrderPaymentMethod />

        {/* 동의 및 결제하기 */}
        <PaymentAgreement />
      </div>
    </div>
  );
};

export default PaymentPage;
