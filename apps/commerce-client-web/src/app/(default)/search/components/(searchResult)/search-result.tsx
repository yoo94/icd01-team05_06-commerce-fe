import React from 'react';
import ProductCard from './product-card';
import { Product } from '@/types/productTypes';
import { parseAndRoundPrice } from '@/lib/utils'; // 유틸리티 함수 가져오기
import useCartStore from '@/stores/use-cart-store'; // 유틸리티 함수 가져오기

// SearchResultProps 타입 정의
export type SearchResultProps = {
  products: Product[];
  onBuyNow: (id: number) => void;
};

const SearchResult = ({ products, onBuyNow }: SearchResultProps) => {
  const { addProduct } = useCartStore();
  return (
    <div className="space-y-4">
      {products.map((product) => {
        const roundedPrice = parseAndRoundPrice(product.price); // 유틸리티 함수 사용

        return (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.coverImage}
            title={product.title}
            price={roundedPrice} // 반올림된 가격을 전달
            description={product.description}
            discount={product.discount} // 할인 가격
            tags={product.tags}
            onAddToCart={() => addProduct(product)}
            onBuyNow={() => onBuyNow(product.id)}
          />
        );
      })}
    </div>
  );
};

export default SearchResult;
