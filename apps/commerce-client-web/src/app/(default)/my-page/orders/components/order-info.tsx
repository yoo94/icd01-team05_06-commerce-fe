import { DateRange, SortBy } from '@/types/order-types';
import { getOrders } from '@/app/actions/order-action';
import OrderPagination from '@/app/(default)/my-page/orders/components/order-pagination';
import OrderTable from './order-table';

interface OrderInfoProps {
  page: number;
}

const PAGE_OFFSET = 1;
const PAGE_SIZE = 10;

const OrderInfo = async ({ page }: OrderInfoProps) => {
  const { products: orders, paginationInfo } = await getOrders({
    dateRange: DateRange.LAST_6_MONTHS,
    sortBy: SortBy.RECENT,
    page: page - PAGE_OFFSET,
    size: PAGE_SIZE,
  });

  return (
    <div className="flex flex-col gap-2 text-sm">
      <OrderTable orders={orders} />
      <OrderPagination
        currentPage={paginationInfo.currentPage}
        totalPage={paginationInfo.totalPage}
        hasNext={paginationInfo.hasNextPage}
        hasPrev={paginationInfo.hasPreviousPage}
      />
      <div className="flex flex-col gap-1">
        <p>
          - 발송 전 주문은 주문상세내역에서 주문취소, 배송 주소 변경(국내배송만 해당)이 가능합니다.
        </p>
        <p>- 주문번호를 클릭하시면 주문상세내역을 확인하실 수 있습니다.</p>
      </div>
    </div>
  );
};

export default OrderInfo;
