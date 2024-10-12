import { Pagination } from '@/types/pagination-types';

export interface ProductCategory {
  id: number;
  name: string;
  parentCategory?: ProductCategory;
}

export interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  discountedPrice: number;
  publisher: string;
  publishDate: string;
  isbn: string;
  description: string;
  pages: number;
  coverImage: string;
  previewLink: string;
  stockQuantity: number;
  rating: number;
  status: string;
  category: ProductCategory;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}
