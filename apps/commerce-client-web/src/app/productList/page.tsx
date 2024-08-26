'use client';

import React from 'react';
import ProductCard from '@/components/productCard';

export default function ProductListPage() {
  const mockProducts = [
    {
      id: 1,
      imageUrl: 'https://placehold.co/600x400',
      title: 'Commodo odio',
      price: '47,000',
      likes: 2,
      comments: 0,
    },
    {
      id: 2,
      imageUrl: 'https://placehold.co/600x400',
      title: 'In tellus integer',
      price: '38,000',
      likes: 0,
      comments: 0,
    },
    {
      id: 3,
      imageUrl: 'https://placehold.co/600x400',
      title: 'Vintage book set',
      price: '58,000',
      likes: 0,
      comments: 0,
    },
    {
      id: 4,
      imageUrl: 'https://placehold.co/600x400',
      title: 'Dolor magna eget',
      price: '48,000',
      likes: 0,
      comments: 0,
    },
    {
      id: 5,
      imageUrl: 'https://placehold.co/600x400',
      title: 'Dolor sit',
      price: '58,000',
      likes: 0,
      comments: 0,
    },
  ];

  const handleAddToCart = (productId: number) => {
    alert(`상품 ID ${productId} 장바구니에 추가되었습니다.`);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          likes={product.likes}
          comments={product.comments}
          onAddToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
  );
}
