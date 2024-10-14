import { externalApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { Category } from '@/types/category-types';
import { FetchProductsParams, HomePageData, ProductsResponse } from '@/types/product-types';

export const fetchHomePageBooks = async (): Promise<HomePageData> => {
  const response = await externalApi
    .get('product/v1/home/products ')
    .json<ApiResponse<HomePageData>>();

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
  const response = await externalApi.get('product/v1/categories').json<ApiResponse<Category>>();

  if (!response.success || !response.data) {
    throw new Error('Failed to fetch categories');
  }

  if (!response.data.childCategories) {
    return [];
  }

  return response.data.childCategories;
};

export const fetchProducts = async ({
  productCategoryId,
  searchWord,
  page,
  size,
}: FetchProductsParams) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (productCategoryId) {
    queryParams.set('productCategoryId', productCategoryId.toString());
  }

  if (searchWord) {
    queryParams.set('searchWord', searchWord);
  }

  const response = await externalApi
    .get(`product/v1/products?${queryParams.toString()}`)
    .json<ApiResponse<ProductsResponse>>();

  console.log(response);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message);
  }

  return response.data;
};
