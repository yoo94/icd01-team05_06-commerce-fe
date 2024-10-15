'use client';

import { useCallback } from 'react';
import { useOrdersStore } from '@/stores/use-orders-store';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/common/date-picker';
import SortBySelect from './sort-by-select';
import OrderStatusSelect from './order-status-select';

interface SearchBoxProps {
  page: number;
}

const SearchBox = ({ page }: SearchBoxProps) => {
  const { startDate, endDate, changeStartDate, changeEndDate, fetchOrders } = useOrdersStore();

  const handleClick = useCallback(async () => {
    await fetchOrders(page);
  }, [fetchOrders, page]);

  return (
    <div className="border-primary relative flex flex-col gap-3 rounded-lg border-2 p-4 pb-20 text-sm text-slate-600 sm:pb-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">정렬 기준</span>
          <SortBySelect />
        </div>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">주문 상태</span>
          <OrderStatusSelect />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2">
          <span>조회 기간</span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-2">
          <DatePicker defaultDate={startDate} onChange={changeStartDate} />
          <span>~</span>
          <DatePicker defaultDate={endDate} onChange={changeEndDate} />
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button onClick={handleClick}>조회</Button>
      </div>
    </div>
  );
};

export default SearchBox;
