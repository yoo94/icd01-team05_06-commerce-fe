// SearchResult.tsx
import React from 'react';
import ProductCard from '@/app/components/(searchResult)/productCard';
import { SearchResultProps } from '@/types/productTypes'; // 인터페이스를 가져오기

function SearchResult({ products, onAddToCart, onBuyNow }: SearchResultProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          onAddToCart={() => onAddToCart(product.id)}
          onBuyNow={() => onBuyNow(product.id)}
        />
      ))}
    </div>
  );
}

export default SearchResult;
