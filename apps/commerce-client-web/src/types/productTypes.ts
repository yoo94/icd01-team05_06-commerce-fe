// src/types/productTypes.ts

export type Product = {
  id: number;
  coverImage: string;
  title: string;
  author: string; // authors가 아니라 author로 수정
  publisher: string;
  pubdate: string; // publishedDate가 아니라 pubdate로 수정
  price: number; // price를 number로 유지
  discount: number;
  tags: string[];
  description: string;
  category: {
    id: number;
    name: string;
    parentCategory: {
      id: number;
      name: string;
    };
  };
};
