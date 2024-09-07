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

// SearchResultProps 타입 정의
export type SearchResultProps = {
  products: Product[];
  onAddToCart: (id: number) => void;
  onBuyNow: (id: number) => void;
};

// ProductCardProps 타입 정의
export type ProductCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number; // 또는 number (parseAndRoundPrice 함수가 문자열을 반환하는 경우 string 사용)
  discount: number;
  tags: string[];
  onAddToCart: () => void;
  onBuyNow: () => void;
};
