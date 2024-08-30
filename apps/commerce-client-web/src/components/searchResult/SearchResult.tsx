// SearchResult.tsx
import React from 'react';
import ProductCard from '@/components/searchResult/productCard';

interface SearchResultProps {
  products: Array<{
    id: number;
    imageUrl: string;
    title: string;
    price: string;
    authors: string;
    publisher: string;
    publishedDate: string;
    discount: string;
    tags: string[];
  }>;
  onAddToCart: (id: number) => void;
  onBuyNow: (id: number) => void;
}

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
