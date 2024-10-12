'use client';
import { useEffect, useState } from 'react';
import useCartStore from '@/stores/use-cart-store';
import { CartItem } from '@/types/cart-types';
import PaymentProducts from '@/app/(default)/order/components/payment-products';
import PaymentSummary from '@/app/(default)/order/components/payment-summary';
import PaymentUserInfo from '@/app/(default)/order/components/payment-userInfo';
import OrderShippingInfo from '@/app/(default)/order/components/payment-shippinginfo';
import OrderPaymentMethod from '@/app/(default)/order/components/payment-method';
import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';
import { useWithLoading } from '@/components/common/with-loading-spinner';
const PaymentPage = () => {
  const { fetchItems, items } = useCartStore();
  const [selectedBooks, setSelectedBooks] = useState<CartItem[]>([]);
  const withLoading = useWithLoading();

  useEffect(() => {
    withLoading(async () => {
      await fetchItems();
    });
  }, []);

  useEffect(() => {
    withLoading(async () => {
      const storedSelectedItems = sessionStorage.getItem('selectedItems');
      if (storedSelectedItems) {
        const selectedIds = JSON.parse(storedSelectedItems);
        const selectedBooks = items.filter((item) => selectedIds.includes(item.productId));
        setSelectedBooks(selectedBooks);
      }
    });
  }, [items]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-left text-xl font-semibold">결제 정보</h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* 주문 상품 정보 */}
        <PaymentProducts books={selectedBooks} />
        {/* 주문 요약 */}
        <PaymentSummary books={selectedBooks} />
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

export default PaymentPage;
