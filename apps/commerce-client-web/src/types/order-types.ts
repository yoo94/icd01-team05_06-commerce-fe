import type { Enum } from '@/types/util-types';
import type { Pagination } from '@/types/pagination-types';

export const OrderStatus = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUND: 'REFUND',
  EXCHANGE: 'EXCHANGE',
} as const;

export type OrderStatus = Enum<typeof OrderStatus>;

export const DateRange = {
  LAST_WEEK: 'LAST_WEEK',
  LAST_MONTH: 'LAST_MONTH',
  LAST_3_MONTH: 'LAST_3_MONTHS',
  LAST_6_MONTHS: 'LAST_6_MONTHS',
  CUSTOM: 'CUSTOM',
} as const;

export type DateRange = Enum<typeof DateRange>;

export const SortBy = {
  RECENT: 'RECENT',
  ORDER_STATUS: 'ORDER_STATUS',
  ALL: 'ALL',
} as const;

export type SortBy = Enum<typeof SortBy>;

export interface Order {
  id: string;
  orderNumber: string;
  content: string;
  orderDate: string;
  status: OrderStatus;
  price: number;
  discountedPrice: number;
  memberName: string;
  recipient: string;
}

export interface OrdersResponse {
  products: Order[];
  paginationInfo: Pagination;
}
