'use client';

import { useParams } from 'next/navigation';
import React from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {id}</p>
      {/* 여기서 id를 사용해 백엔드에서 상품 데이터를 가져올 수 있습니다 */}
    </div>
  );
}
