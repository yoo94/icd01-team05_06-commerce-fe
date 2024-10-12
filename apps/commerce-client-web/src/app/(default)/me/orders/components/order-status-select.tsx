'use client';

import { OrderStatus } from '@/types/order-types';
import { useOrdersStore } from '@/stores/use-orders-store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const OrderStatusSelect = () => {
  const { orderStatus, changeOrderStatus } = useOrdersStore();

  const orderStatusTitles: Record<OrderStatus, string> = {
    [OrderStatus.ALL]: '전체',
    [OrderStatus.COMPLETED]: '주문 완료',
    [OrderStatus.CANCELLED]: '주문 취소',
    [OrderStatus.SHIPPING]: '배송중',
    [OrderStatus.DELIVERED]: '배송 완료',
    [OrderStatus.REFUNDED]: '환불',
  };

  return (
    <Select value={orderStatus} onValueChange={changeOrderStatus}>
      <SelectTrigger className="md:w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(orderStatusTitles).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
