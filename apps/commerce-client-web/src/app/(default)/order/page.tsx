import { getProductForOrder } from '@/app/actions/product-action';
import PaymentProducts from '@/app/(default)/order/components/payment-products';
import PaymentSummary from '@/app/(default)/order/components/payment-summary';
import PaymentUserInfo from '@/app/(default)/order/components/payment-userInfo';
import OrderShippingInfo from '@/app/(default)/order/components/payment-shippinginfo';
import OrderPaymentMethod from '@/app/(default)/order/components/payment-method';
import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';

interface OrderPageProps {
  searchParams: { productId: string[]; quantity: string[] };
}

const PaymentPage = async ({ searchParams }: OrderPageProps) => {
  // URL 쿼리 파라미터에서 상품 ID와 수량을 받아 API 요청 준비
  const products = searchParams.productId.map((id, index) => ({
    productId: parseInt(id),
    quantity: parseInt(searchParams.quantity[index]),
  }));

  // 서버에서 API 호출
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
