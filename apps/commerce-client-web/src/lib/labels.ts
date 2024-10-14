import { OrderStatus } from '@/types/order-types';

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.ALL]: '전체',
  [OrderStatus.COMPLETED]: '주문 완료',
  [OrderStatus.CANCELLED]: '주문 취소',
  [OrderStatus.SHIPPING]: '배송중',
  [OrderStatus.DELIVERED]: '배송 완료',
  [OrderStatus.REFUNDED]: '환불',
};
