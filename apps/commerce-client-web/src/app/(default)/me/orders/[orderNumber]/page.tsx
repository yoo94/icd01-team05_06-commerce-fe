import { getOrder } from '@/app/actions/order-action';
import BasicInfo from './components/basic-info';
import ProductsInfo from './components/products-info';
import PaymentInfo from './components/payment-info';

interface Props {
  params: { orderNumber: string };
}

const Page = async ({ params: { orderNumber } }: Props) => {
  const order = await getOrder(orderNumber);

  return (
    <div className="flex flex-col gap-4">
      <header>주문 조회</header>
      <div className="flex flex-col gap-4">
        <BasicInfo
          orderNumber={order.orderNumber}
          orderStatus={order.orderStatus}
          orderDate={order.orderDate}
        />
        <ProductsInfo products={order.products} />
        <PaymentInfo paymentInfo={order.paymentInfo} />
      </div>
    </div>
  );
};

export default Page;
