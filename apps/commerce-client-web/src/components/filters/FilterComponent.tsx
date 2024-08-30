import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import PriceFilter from '@/components/filters/PriceFilter';
import PublisherFilter from '@/components/filters/PublisherFilter';
import CategoryFilter from '@/components/filters/CategoryFilter';

function FilterComponent() {
  return (
    <div className="w-full max-w-md p-4 border rounded-lg">
      <Accordion type="multiple" className="w-full">
        <PriceFilter />
        <PublisherFilter />
        <CategoryFilter />
        {/* 추가적인 필터를 여기에 추가할 수 있습니다 */}
      </Accordion>
    </div>
  );
}

export default FilterComponent;
