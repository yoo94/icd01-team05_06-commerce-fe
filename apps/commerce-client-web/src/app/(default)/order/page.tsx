import { getProductForOrder } from '@/app/actions/product-action';
import PaymentProducts from '@/app/(default)/order/components/payment-products';
import PaymentSummary from '@/app/(default)/order/components/payment-summary';
import PaymentUserInfo from '@/app/(default)/order/components/payment-userInfo';
import OrderShippingInfo from '@/app/(default)/order/components/payment-shippinginfo';
import OrderPaymentMethod from '@/app/(default)/order/components/payment-method';
import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';

interface OrderPageProps {
  searchParams: { productId: string | string[]; quantity: string | string[] };
}

const toArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);

const PaymentPage = async ({ searchParams }: OrderPageProps) => {
  const productIds = toArray(searchParams.productId);
  const quantities = toArray(searchParams.quantity);

  const products = productIds.map((id, index) => ({
    productId: parseInt(id),
    quantity: parseInt(quantities[index] || '1'),
  }));

  const productResponse = await getProductForOrder({ products });

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-left text-xl font-semibold">결제 정보</h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <PaymentProducts books={productResponse.products} />
        <PaymentSummary books={productResponse.products} />
        <PaymentUserInfo />
        <OrderShippingInfo />
        <OrderPaymentMethod />
        <PaymentAgreement />
      </div>
    </div>
  );
};

export default PaymentPage;
