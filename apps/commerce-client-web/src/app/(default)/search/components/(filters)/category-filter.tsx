'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 가져오기
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Product } from '@/types/product-types';

interface CategoryFilterProps {
  books: Product[]; // 정확한 Book 타입을 사용
}

const CategoryFilter = ({ books }: CategoryFilterProps) => {
  const router = useRouter();

  // books에서 카테고리 추출 (예: 중복 제거)
  const categories = [...new Set(books.map((book) => book.category.name))];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryValue = event.target.value;

    // 현재 URL의 쿼리 파라미터를 업데이트
    const currentParams = new URLSearchParams(window.location.search);
    let selectedCategories = currentParams.get('category')?.split(',') || [];

    if (event.target.checked) {
      // 체크박스가 선택된 경우 카테고리를 추가
      selectedCategories.push(categoryValue);
    } else {
      // 체크박스가 해제된 경우 카테고리를 제거
      selectedCategories = selectedCategories.filter((category) => category !== categoryValue);
    }

    if (selectedCategories.length > 0) {
      currentParams.set('category', selectedCategories.join(','));
    } else {
      currentParams.delete('category');
    }

    // URL을 업데이트하며 페이지를 다시 로드하지 않음
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <AccordionItem value="category">
      <AccordionTrigger>분야</AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`category-${index}`}
                value={category}
                className="mr-2"
                onChange={handleCategoryChange}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryFilter;
