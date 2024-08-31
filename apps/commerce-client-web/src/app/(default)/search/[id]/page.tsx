'use client'; // Ensure the component is a client component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import products from '@/data/products.json'; // Adjust path as necessary
import Breadcrumb from '@/app/components/Breadcrumb';
import { Product } from '@/types/productTypes'; // Product 타입 가져오기

const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // 수량 상태 추가
  const [selectedTab, setSelectedTab] = useState<string>('book-info'); // 선택된 탭 상태 추가

  useEffect(() => {
    if (params?.id) {
      const productId = Array.isArray(params.id)
        ? parseInt(params.id[0], 10)
        : parseInt(params.id, 10);
      const foundProduct = products.find((p) => p.id === productId) || null;
      setProduct(foundProduct);
    }
  }, [params]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // 수량이 1 이하로 내려가지 않도록 설정
  };

  const renderContent = () => {
    if (!product) return null;

    switch (selectedTab) {
      case 'book-info':
        return <div>{product.description}</div>;
      case 'reviews':
        return (
          <div>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <p key={index} className="mb-2">
                  {review}
                </p>
              ))
            ) : (
              <p>아직 리뷰가 없습니다.</p>
            )}
          </div>
        );
      case 'shipping':
        return <div>배송/반품/교환 정보가 여기에 표시됩니다.</div>;
      case 'product-info':
        return <div>품목정보가 여기에 표시됩니다.</div>;
      default:
        return null;
    }
  };

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={product.breadcrumbs} />

      {/* Main Content Area */}
      <div className="flex">
        {/* Product Image */}
        <div className="w-1/3">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Information */}
        <div className="w-2/3 pl-6">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600">
            {product.authors} | {product.publisher} | {product.publishedDate}
          </p>

          <div className="mt-4 mb-6">
            <p className="text-lg font-semibold text-gray-900">
              정가: <span className="line-through">15,000원</span>
            </p>
            <p className="text-lg font-semibold text-red-600">
              판매가: {product.price} {product.discount}
            </p>
          </div>

          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>

        {/* Sidebar with Actions */}
        <div className="w-1/4 ml-6">
          <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-lg px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="text-lg px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button className="w-full py-2 mb-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
              카트에 넣기
            </button>
            <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              바로구매
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 border-t pt-4">
        <ul className="flex space-x-4 text-sm">
          <li>
            <button
              className={`text-gray-700 hover:underline ${selectedTab === 'book-info' ? 'font-bold' : ''}`}
              onClick={() => setSelectedTab('book-info')}
            >
              도서정보
            </button>
          </li>
          <li>
            <button
              className={`text-gray-700 hover:underline ${selectedTab === 'reviews' ? 'font-bold' : ''}`}
              onClick={() => setSelectedTab('reviews')}
            >
              리뷰/한줄평
            </button>
          </li>
          <li>
            <button
              className={`text-gray-700 hover:underline ${selectedTab === 'shipping' ? 'font-bold' : ''}`}
              onClick={() => setSelectedTab('shipping')}
            >
              배송/반품/교환
            </button>
          </li>
          <li>
            <button
              className={`text-gray-700 hover:underline ${selectedTab === 'product-info' ? 'font-bold' : ''}`}
              onClick={() => setSelectedTab('product-info')}
            >
              품목정보
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default ProductDetailsPage;
