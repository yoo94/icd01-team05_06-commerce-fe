'use client';
import { useEffect } from 'react';
import useCartStore from '@/stores/use-cart-store';
import PaymentProducts from '@/app/(default)/order/components/payment-products';
import PaymentSummary from '@/app/(default)/order/components/payment-summary';
import PaymentUserInfo from '@/app/(default)/order/components/payment-userInfo';
import OrderShippingInfo from '@/app/(default)/order/components/payment-shippinginfo';
import OrderPaymentMethod from '@/app/(default)/order/components/payment-method';
import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';
import { useWithLoading } from '@/components/common/with-loading-spinner';
import { usePaymentStore } from '@/stores/use-payment-store';

const PaymentPage = () => {
  const { fetchItems, items } = useCartStore();
  const { setSelectedBooks, selectedBooks } = usePaymentStore(); // usePaymentStore 사용
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
        setSelectedBooks(selectedBooks); // 선택된 책들을 PaymentStore에 저장
      }
    });
  }, [items, setSelectedBooks]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-left text-xl font-semibold">결제 정보</h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <PaymentProducts books={selectedBooks} />
        <PaymentSummary books={selectedBooks} />
        <PaymentUserInfo />
        <OrderShippingInfo />
        <OrderPaymentMethod />
        <PaymentAgreement />
      </div>
    </div>
  );
};

export default PaymentPage;
