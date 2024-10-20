import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { Category } from '@/types/category-types';
import {
  HomePageData,
  Product,
  ProductsOrderResponse,
  ProductsResponse,
} from '@/types/product-types';
import { getHeadersWithToken } from '@/app/actions/utils/action-helper';

export const fetchHomePageBooks = async (): Promise<HomePageData> => {
  const response = await api.get('product/v1/home/products ').json<ApiResponse<HomePageData>>();

  if (!response.success || !response.data) {
    throw new Error('Invalid response format');
  }

  return {
    hotNew: response.data.hotNew,
    recommend: response.data.recommend,
    bestseller: response.data.bestseller,
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get('product/v1/categories').json<ApiResponse<Category>>();

  if (!response.success || !response.data) {
    throw new Error('Failed to fetch categories');
  }

  if (!response.data.childCategories) {
    return [];
  }

  return response.data.childCategories;
};

export const fetchProducts = async (queryParams: string) => {
  const response = await api
    .get(`product/v1/products?${queryParams}`)
    .json<ApiResponse<ProductsResponse>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};

export const fetchProductById = async (productId: number): Promise<Product> => {
  const response = await api.get(`product/v1/products/${productId}`).json<ApiResponse<Product>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch product details');
  }

  return response.data;
};

export const getProductForOrder = async (orderData: {
  products: { productId: number; quantity: number }[];
}): Promise<ProductsOrderResponse> => {
  const headers = await getHeadersWithToken();

  if (!headers) {
    throw new Error('No token found');
  }
  const response = await api
    .post('product/v1/products/order/before', {
      body: JSON.stringify(orderData),
      headers,
    })
    .json<ApiResponse<ProductsOrderResponse>>();

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch products before order');
  }

  return response.data;
};
