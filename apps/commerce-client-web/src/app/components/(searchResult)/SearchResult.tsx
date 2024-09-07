// SearchResult.tsx
import React from 'react';
import ProductCard from '@/app/components/(searchResult)/productCard';
import { Product, SearchResultProps } from '@/types/productTypes';
import usecartstore from '@/stores/usecartstore'; // 인터페이스를 가져오기

function SearchResult({ products, onBuyNow }: SearchResultProps) {
  const { addProduct } = usecartstore();
  return (
    <div className="space-y-4">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          onAddToCart={() => addProduct(product)}
          onBuyNow={() => onBuyNow(product.id)}
        />
      ))}
    </div>
  );
}

export default SearchResult;
