import React from 'react';
import ProductCard from './product-card';
import { Product } from '@/types/productTypes';
import useCartStore from '@/stores/use-cart-store'; // 유틸리티 함수 가져오기

// SearchResultProps 타입 정의
export type SearchResultProps = {
  products: Product[];
  onBuyNow: (id: number) => void;
  onAddToCart: (id: number) => void;
};

const SearchResult = ({ products, onBuyNow }: SearchResultProps) => {
  const { addProduct } = useCartStore();
  return (
    <div className="space-y-4">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            product={product}
            onAddToCart={() => addProduct(product)}
            onBuyNow={() => onBuyNow(product.id)}
          />
        );
      })}
    </div>
  );
};

export default SearchResult;
