// src/types/productTypes.ts

import { BreadCrumbItem } from '@/types/breadCrumbTypes';

export type Product = {
  id: number;
  imageUrl: string;
  title: string;
  authors: string;
  publisher: string;
  publishedDate: string;
  price: string;
  discount: string;
  tags: string[];
  breadcrumbs: BreadCrumbItem[];
  description: string;
  reviews: string[];
};
