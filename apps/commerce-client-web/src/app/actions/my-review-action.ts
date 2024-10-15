'use server';

import { externalApi } from '@/lib/api';
import type { ApiResponse } from '@/types/api-types';
import { MyReviewResponse } from '@/types/my-review-type';
import { getHeadersWithToken } from './utils/action-helper';

export const getMyReviews = async (): Promise<MyReviewResponse> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }

  const response = await externalApi
    .get('product/v1/reviews/me', { headers })
    .json<ApiResponse<MyReviewResponse>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};
