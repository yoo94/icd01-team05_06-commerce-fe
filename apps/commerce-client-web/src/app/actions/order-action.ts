'use server';

import type { SearchParamsOption } from 'ky';
import type { ApiResponse } from '@/types/api-types';
import type { DateRange, OrdersResponse, OrderStatus, SortBy } from '@/types/order-types';
import { externalApi, orderApi } from '@/lib/api';
import { getHeadersWithToken } from './action-helper';
interface CreateOrderRequest {
  products: {
    id: number;
    quantity: number;
  }[];
  ordererInfo: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  deliveryInfo: {
    recipient: string;
    phoneNumber: string;
    streetAddress: string;
    detailAddress: string;
    postalCode: string;
    memo?: string;
  };
  paymentInfo: {
    method: string;
    depositorName: string;
  };
  agreementInfo: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    ageVerification: boolean;
  };
}

interface GetOrdersParams {
  dateRange?: DateRange;
  status?: OrderStatus;
  sortBy?: SortBy;
  page?: number;
  size?: number;
  orderStartDate?: string;
  orderEndDate?: string;
}

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
