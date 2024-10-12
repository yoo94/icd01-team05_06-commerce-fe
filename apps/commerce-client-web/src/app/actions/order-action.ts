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
import { getHeadersWithToken } from './action-helper';

interface GetOrdersParams {
  dateRange?: DateRange;
  status?: OrderStatus;
  sortBy?: SortBy;
  page?: number;
  size?: number;
  orderStartDate?: string;
  orderEndDate?: string;
}

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

export const getOrder = async (id: number): Promise<DetailOrder> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const response = await externalApi
    .get(`order/v1/orders/${id}`, { headers })
    .json<ApiResponse<DetailOrder>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};
