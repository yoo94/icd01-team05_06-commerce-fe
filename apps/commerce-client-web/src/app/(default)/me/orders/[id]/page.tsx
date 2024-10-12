import { getOrder } from '@/app/actions/order-action';

interface Props {
  params: { id: string };
}

const Page = async ({ params: { id } }: Props) => {
  const order = await getOrder(Number(id));

  return (
    <div className="flex flex-col gap-4">
      <header>주문 조회</header>
      <div className="flex flex-col gap-4">{order.orderNumber}</div>
    </div>
  );
};

export default Page;
