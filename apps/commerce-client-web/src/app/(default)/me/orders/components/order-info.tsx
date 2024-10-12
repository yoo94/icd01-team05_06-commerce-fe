'use client';

import { useEffect } from 'react';
import { useOrdersStore } from '@/stores/use-orders-store';
import OrderTable from './order-table';
import CustomPagination from '@/components/common/custom-pagenation';

interface OrderInfoProps {
  page: number;
}

const OrderInfo = ({ page }: OrderInfoProps) => {
  const { orders, pagination, fetchOrders } = useOrdersStore();

  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders, page]);

  return (
    <div className=" flex flex-col gap-2 text-sm">
      <OrderTable orders={orders} />
      {pagination !== null && (
        <CustomPagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          hasNext={pagination.hasNextPage}
          hasPrev={pagination.hasPreviousPage}
          generatePageLink={(page) => `?page=${page}`} // Customize page link generation
        />
      )}
      <div className="flex flex-col gap-1 text-xs font-light text-slate-500">
        <p>
          - 발송 전 주문은 주문상세내역에서 주문취소, 배송 주소 변경(국내배송만 해당)이 가능합니다.
        </p>
        <p>- 주문번호를 클릭하시면 주문상세내역을 확인하실 수 있습니다.</p>
      </div>
    </div>
  );
};

export default OrderInfo;
