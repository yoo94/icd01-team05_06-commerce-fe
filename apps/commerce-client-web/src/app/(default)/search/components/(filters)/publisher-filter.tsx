import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // useRouter, useSearchParams 가져오기
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface PublisherFilterProps {
  publishers: string[]; // 출판사 목록을 props로 전달받음
}

const PublisherFilter = ({ publishers }: PublisherFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 현재 URL 파라미터 가져오기

  const handlePublisherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const publisherValue = event.target.value;

    // 현재 URL의 쿼리 파라미터를 업데이트
    const currentParams = new URLSearchParams(searchParams.toString());
    let selectedPublishers = currentParams.get('publisher')?.split(',') || [];

    if (event.target.checked) {
      // 체크박스가 선택된 경우 출판사를 추가
      selectedPublishers.push(publisherValue);
    } else {
      // 체크박스가 해제된 경우 출판사를 제거
      selectedPublishers = selectedPublishers.filter((publisher) => publisher !== publisherValue);
    }

    if (selectedPublishers.length > 0) {
      currentParams.set('publisher', selectedPublishers.join(','));
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
          {publishers.map((publisher, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`publisher-${index}`}
                value={publisher}
                className="mr-2"
                onChange={handlePublisherChange}
                defaultChecked={searchParams.get('publisher')?.split(',').includes(publisher)} // URL에 이미 포함된 경우 체크 표시
              />
              <label htmlFor={`publisher-${index}`}>{publisher}</label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PublisherFilter;
