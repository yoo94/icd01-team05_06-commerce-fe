import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 가져오기
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

function PublisherFilter() {
  const router = useRouter();

  const handlePublisherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const publisherValue = event.target.value;

    // 현재 URL의 쿼리 파라미터를 업데이트
    const currentParams = new URLSearchParams(window.location.search);
    let publishers = currentParams.get('publisher')?.split(',') || [];

    if (event.target.checked) {
      // 체크박스가 선택된 경우 출판사를 추가
      publishers.push(publisherValue);
    } else {
      // 체크박스가 해제된 경우 출판사를 제거
      publishers = publishers.filter((publisher) => publisher !== publisherValue);
    }

    if (publishers.length > 0) {
      currentParams.set('publisher', publishers.join(','));
    } else {
      currentParams.delete('publisher');
    }

    // URL을 업데이트하며 페이지를 다시 로드하지 않음
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <AccordionItem value="publisher">
      <AccordionTrigger>출판사</AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2">
          <li>
            <input
              type="checkbox"
              id="publisher-1"
              value="publisher-1"
              className="mr-2"
              onChange={handlePublisherChange}
            />
            <label htmlFor="publisher-1">출판사 1</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="publisher-2"
              value="publisher-2"
              className="mr-2"
              onChange={handlePublisherChange}
            />
            <label htmlFor="publisher-2">출판사 2</label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

export default PublisherFilter;
