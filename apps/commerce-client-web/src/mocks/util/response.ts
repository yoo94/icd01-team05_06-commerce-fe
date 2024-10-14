import { ApiResponse } from '@/types/api-types';

export function withResponse<Data>(data: Data): ApiResponse<Data> {
  return {
    success: true,
    data: data,
    error: null,
  };
}
