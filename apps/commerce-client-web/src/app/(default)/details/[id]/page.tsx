'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams } from 'next/navigation';
import products from '@/data/products.json'; // Adjust path as necessary
import { Product } from '@/types/productTypes';
import { parseAndRoundPrice } from '@/lib/utils';
import Breadcrumb from '@/app/(default)/search/components/Breadcrumb';

// 카테고리 한글명 변환 객체
const categoryTranslation: { [key: string]: string } = {
  DOMESTIC: '국내도서',
  DOMESTIC_POETRY: '국내 시',
  FOREIGN: '외국도서',
  FOREIGN_HISTORY: '외국 역사',
  FOREIGN_POETRY: '외국 시',
};

const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const bookInfoRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);

  // 비동기적으로 BookInfoPage 가져오기
  const BookInfoPage = React.lazy(() => import('@/app/(default)/details/[id]/book-info/bookinfo'));

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
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const parentCategoryName =
    categoryTranslation[product.category.parentCategory.name] ||
    product.category.parentCategory.name;
  const categoryName = categoryTranslation[product.category.name] || product.category.name;

  const breadcrumbItems = [
    { label: parentCategoryName, href: `/category/${product.category.parentCategory.id}` },
    { label: categoryName, href: `/category/${product.category.id}` },
  ];

  const originalPrice = parseAndRoundPrice(product.price);
  const discountedPrice = product.discount
    ? parseAndRoundPrice(product.price - product.discount)
    : null;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex">
        <div className="w-1/3">
          <img
            src={product.coverImage}
            alt={product.title}
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="w-2/3 pl-6">
          <h1 className="mb-2 text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-gray-600">
            {product.author} | {product.publisher} | {product.pubdate}
          </p>

          <div className="mb-6 mt-4">
            {product.discount > 0 ? (
              <>
                <p className="text-lg font-semibold text-gray-900">
                  정가: <span className="text-red-500 line-through">{originalPrice}</span>
                </p>
                <p className="text-lg font-semibold text-red-600">판매가: {discountedPrice}원</p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-900">품절</p>
            )}
          </div>

          <p className="mb-4 text-gray-700">{product.description}</p>
        </div>

        <div className="ml-6 w-1/4">
          <div className="rounded-lg border bg-gray-50 p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <button
                className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button className="mb-2 w-full rounded-lg bg-green-500 py-2 font-semibold text-white hover:bg-green-600">
              카트에 넣기
            </button>
            <button className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600">
              바로구매
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-4">
        <ul className="flex space-x-4 text-sm">
          <li>
            <button
              className="text-gray-700 hover:underline"
              onClick={() => scrollToSection(bookInfoRef)}
            >
              도서정보
            </button>
          </li>
          <li>
            <button
              className="text-gray-700 hover:underline"
              onClick={() => scrollToSection(reviewsRef)}
            >
              리뷰/한줄평
            </button>
          </li>
          <li>
            <button
              className="text-gray-700 hover:underline"
              onClick={() => scrollToSection(shippingRef)}
            >
              배송/반품/교환
            </button>
          </li>
          <li>
            <button
              className="text-gray-700 hover:underline"
              onClick={() => scrollToSection(productInfoRef)}
            >
              품목정보
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <div ref={bookInfoRef}>
          <Suspense fallback={<div>Loading...</div>}>
            <BookInfoPage description={product.description} />
          </Suspense>
        </div>

        <div ref={reviewsRef} className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">리뷰/한줄평</h2>
          <div>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <p key={index} className="mb-2">
                  {review}
                </p>
              ))
            ) : (
              <p>아직 리뷰가 없습니다.</p>
            )}
          </div>
        </div>

        <div ref={shippingRef} className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">배송/반품/교환</h2>
          <div>배송/반품/교환 정보가 여기에 표시됩니다.</div>
        </div>

        <div ref={productInfoRef} className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">품목정보</h2>
          <div>품목정보가 여기에 표시됩니다.</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
