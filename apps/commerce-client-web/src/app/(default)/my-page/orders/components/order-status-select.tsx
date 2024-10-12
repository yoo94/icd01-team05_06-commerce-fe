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

  return (
    <Select value={orderStatus} onValueChange={changeOrderStatus}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={OrderStatus.ALL}>전체</SelectItem>
          <SelectItem value={OrderStatus.PENDING}>주문 생성</SelectItem>
          <SelectItem value={OrderStatus.PROCESSING}>주문 처리중</SelectItem>
          <SelectItem value={OrderStatus.SHIPPED}>배송중</SelectItem>
          <SelectItem value={OrderStatus.DELIVERED}>배송완료</SelectItem>
          <SelectItem value={OrderStatus.CANCELLED}>주문 취소</SelectItem>
          <SelectItem value={OrderStatus.REFUND}>환불</SelectItem>
          <SelectItem value={OrderStatus.EXCHANGE}>교환</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
