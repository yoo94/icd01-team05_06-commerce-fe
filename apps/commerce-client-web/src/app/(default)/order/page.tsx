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
import { fetchProductById } from '@/app/actions/product-action';

const PaymentPage = () => {
  const { items, checkedItems } = useCartStore();
  const { setSelectedBooks, selectedBooks } = usePaymentStore();
  const withLoading = useWithLoading();

  useEffect(() => {
    withLoading(async () => {
      setSelectedBooks([]);
      if (checkedItems) {
        const selectedIds = checkedItems;

        const fetchSelectedBooks = async () => {
          const books = await Promise.all(
            selectedIds.map(async (productId: number) => {
              const book = await fetchProductById(productId);
              const bookWithQuantity = {
                ...book,
                quantity: 1,
              };
              const matchingItem = items.find((item) => item.productId === book.id);
              if (matchingItem) {
                bookWithQuantity.quantity = matchingItem.quantity;
              }
              return bookWithQuantity;
            }),
          );

          const validBooks = books.filter((book) => book !== null);
          setSelectedBooks(validBooks);
        };

        fetchSelectedBooks();
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
