'use server';

import type { SearchParamsOption } from 'ky';
import type { ApiResponse } from '@/types/api-types';
import type {
  DateRange,
  DetailOrder,
  OrdersResponse,
  OrderStatus,
  SortBy,
} from '@/types/order-types';
import { externalApi } from '@/lib/api';
import { getHeadersWithToken } from './utils/action-helper';
import { Product } from '@/types/product-types';

interface GetOrdersParams {
  dateRange?: DateRange;
  status?: OrderStatus;
  sortBy?: SortBy;
  page?: number;
  size?: number;
  orderStartDate?: string;
  orderEndDate?: string;
}

export const searchBooks = async (productId: number): Promise<Product> => {
  try {
    const headers = await getHeadersWithToken();

    if (!headers) {
      throw new Error('No token found');
    }
    const response = await productApi
      .get(`products/${productId}`, {
        headers,
      })
      .json<ApiResponse<Product>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || '상품 검색에 실패했습니다.');
    }
    return response.data;
  } catch (error) {
    console.error('상품 검색 중 오류가 발생했습니다.', error);
    throw new Error('상품 검색 중 오류가 발생했습니다.');
  }
};

export const createOrder = async (orderData: CreateOrderRequest): Promise<OrdersResponse> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }
  const response = await orderApi
    .post('order/v1/orders', {
      json: orderData,
      headers,
    })
    .json<ApiResponse<OrdersResponse>>();
  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to create order');
  }
  return response.data;
};

export const getOrders = async (params: GetOrdersParams): Promise<OrdersResponse> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const searchParams: SearchParamsOption = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams[key] = value;
    }
  }

  const response = await externalApi
    .get('order/v1/orders', {
      headers,
      searchParams,
    })
    .json<ApiResponse<OrdersResponse>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};

export const getOrder = async (orderNumber: string): Promise<DetailOrder> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const response = await externalApi
    .get(`order/v1/orders/${orderNumber}`, { headers })
    .json<ApiResponse<DetailOrder>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};
