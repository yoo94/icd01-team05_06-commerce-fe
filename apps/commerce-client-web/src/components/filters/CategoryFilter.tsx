import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 가져오기
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

function CategoryFilter() {
  const router = useRouter();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryValue = event.target.value;

    // 현재 URL의 쿼리 파라미터를 업데이트
    const currentParams = new URLSearchParams(window.location.search);
    let categories = currentParams.get('category')?.split(',') || [];

    if (event.target.checked) {
      // 체크박스가 선택된 경우 카테고리를 추가
      categories.push(categoryValue);
    } else {
      // 체크박스가 해제된 경우 카테고리를 제거
      categories = categories.filter((category) => category !== categoryValue);
    }

    if (categories.length > 0) {
      currentParams.set('category', categories.join(','));
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
          <li>
            <input
              type="checkbox"
              id="category-1"
              value="category-1"
              className="mr-2"
              onChange={handleCategoryChange}
            />
            <label htmlFor="category-1">분야 1</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="category-2"
              value="category-2"
              className="mr-2"
              onChange={handleCategoryChange}
            />
            <label htmlFor="category-2">분야 2</label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

export default CategoryFilter;
