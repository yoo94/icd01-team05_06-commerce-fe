import React from 'react';
import ProductCard from './product-card';
import { Product } from '@/types/product-types';

// SearchResultProps 타입 정의
export type SearchResultProps = {
  products: Product[];
  onBuyNow: (id: number) => void;
  onAddToCart: (id: number) => void;
};

const SearchResult = ({ products, onBuyNow }: SearchResultProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            product={product}
            onBuyNow={() => onBuyNow(product.id)}
          />
        );
      })}
    </div>
  );
};

export default SearchResult;
