import type { Enum } from '@/types/util-types';
import type { Pagination } from '@/types/pagination-types';

export const OrderStatus = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  SHIPPING: 'SHIPPING',
  DELIVERED: 'DELIVERED',
  REFUNDED: 'REFUNDED',
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

export interface Orderer {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface OrderProduct {
  name: string;
  id: number;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  quantity: number;
  price: number;
  discountedPrice: number;
}

export interface CreatedOrdersResponse {
  id: number;
  orderNumber: string;
  orderStatus: string;
  orderDate: string;
  products: OrderProduct[];
  error: string | null;
}

export interface DeliveryInfo {
  recipient: string;
  phoneNumber: string;
  postalCode: string;
  streetAddress: string;
  detailAddress: string;
  memo: string;
}

export const PaymentMethod = {
  CREDIT_CARD: 'CREDIT_CARD',
} as const;

export type PaymentMethod = Enum<typeof PaymentMethod>;

export interface PaymentInfo {
  method: PaymentMethod;
  depositorName: string;
  price: number;
  discountedPrice: number;
}

export interface DetailOrder {
  id: number;
  orderNumber: string;
  orderDate: string;
  orderer: Orderer;
  products: OrderProduct[];
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  orderStatus: OrderStatus;
}
