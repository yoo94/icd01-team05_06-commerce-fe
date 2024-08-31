'use client';

import { useRouter } from 'next/navigation'; // Next.js useRouter 훅 가져오기
import FilterComponent from '@/components/filters/FilterComponent';
import SearchResult from '@/components/searchResult/SearchResult';

function SearchPage() {
  const router = useRouter(); // useRouter 훅 사용

  const handleAddToCart = (id: number) => {
    console.log(`Add to cart clicked for product ${id}`);
  };

  const handleBuyNow = (id: number) => {
    console.log(`Buy now clicked for product ${id}`);
  };

  // Example search results data
  const searchResults = [
    {
      id: 1, // 고유 식별자 추가
      imageUrl: 'https://image.yes24.com/goods/105266398/XL',
      title: '기초부터 완성까지, 프런트엔드',
      authors: '이재영, 현정지',
      publisher: '비제이퍼블릭',
      publishedDate: '2021년 11월',
      price: '29,700원',
      discount: '(10% 할인)',
      tags: ['개발개념 정리', '프론트입문'],
    },
    {
      id: 2, // 고유 식별자 추가
      imageUrl: 'https://image.yes24.com/goods/101926719/XL',
      title: '프론트엔드의 모든 것',
      authors: '홍길동, 박자바',
      publisher: '자바출판사',
      publishedDate: '2022년 1월',
      price: '34,500원',
      discount: '(5% 할인)',
      tags: ['자바스크립트', '프론트엔드'],
    },
  ];

  const handleItemClick = (id: number) => {
    router.push(`/details/${id}`); // 클릭 시 해당 id의 상세 페이지로 이동
  };

  return (
    <div className="flex">
      {/* Sidebar with filters */}
      <div className="w-1/4 p-4">
        <FilterComponent />
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-4">
        <h1 className="mb-4 text-2xl font-bold">Product List</h1>

        {/* Render the search results */}
        <SearchResult
          products={searchResults}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onClick={handleItemClick}
        />
      </div>
    </div>
  );
}

export default SearchPage;
