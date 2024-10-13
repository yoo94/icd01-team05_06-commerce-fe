import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getOrder } from '@/app/actions/order-action';

interface Props {
  params: { orderNumber: string };
}

interface Info {
  title: string;
  content: string;
}

const Page = async ({ params: { orderNumber } }: Props) => {
  const order = await getOrder(orderNumber);

  const basicInfo: Info[] = [
    {
      title: '주문 번호',
      content: order.orderNumber,
    },
    {
      title: '주문 상태',
      content: order.orderStatus,
    },
    {
      title: '주문일',
      content: format('2024-10-12T17:04:40.375367', 'yyyy년 MM월 dd일 HH시 mm분'),
    },
  ];

  const productsInfo: Info[][] = order.products.map((product) => [
    {
      title: '제목',
      content: product.title,
    },
    {
      title: '저자',
      content: product.author,
    },
    {
      title: '주문 수량',
      content: product.quantity.toString(),
    },
    {
      title: '가격',
      content: `${product.price.toLocaleString()}원`,
    },
  ]);

  const paymentInfo: Info[] = [
    {
      title: '결제 방법',
      content: order.paymentInfo.method,
    },
    {
      title: '총 주문 금액',
      content: `${order.paymentInfo.price.toLocaleString()}원`,
    },
    {
      title: '실 주문 금액',
      content: `${order.paymentInfo.discountedPrice.toLocaleString()}원`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <header>주문 조회</header>
      <div className="flex flex-col gap-4">
        <div>기본 정보</div>
        <div className="flex flex-col border border-gray-200">
          {basicInfo.map((info, i) => (
            <div key={info.title} className={cn('flex', i > 0 && 'border-t border-gray-200')}>
              <div className="flex-1 bg-gray-100 px-2 py-1 text-xs">{info.title}</div>
              <div className="flex-[3] px-2 py-1 text-xs">{info.content}</div>
            </div>
          ))}
        </div>
        <div>상품 정보</div>
        {productsInfo.map((product) => (
          <div className="flex flex-col border border-gray-200">
            {product.map((info, i) => (
              <div key={info.title} className={cn('flex', i > 0 && 'border-t border-gray-200')}>
                <div className="flex-1 bg-gray-100 px-2 py-1 text-xs">{info.title}</div>
                <div className="flex-[3] px-2 py-1 text-xs">{info.content}</div>
              </div>
            ))}
          </div>
        ))}
        <div>결제 정보</div>
        <div className="flex flex-col border border-gray-200">
          {paymentInfo.map((info, i) => (
            <div key={info.title} className={cn('flex', i > 0 && 'border-t border-gray-200')}>
              <div className="flex-1 bg-gray-100 px-2 py-1 text-xs">{info.title}</div>
              <div className="flex-[3] px-2 py-1 text-xs">{info.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
