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
    <div className="border-primary flex flex-col gap-3 rounded-lg border-2 p-4">
      <div>
        <div className="flex items-center gap-2">
          <span>조회 기간</span>
          <DatePicker defaultDate={startDate} onChange={changeStartDate} />
          <span>~</span>
          <DatePicker defaultDate={endDate} onChange={changeEndDate} />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-2">
            <span>정렬 기준</span>
            <SortBySelect />
          </div>
          <div className="flex items-center gap-2">
            <span>주문 상태</span>
            <OrderStatusSelect />
          </div>
        </div>
        <Button onClick={handleClick}>조회</Button>
      </div>
    </div>
  );
};

export default SearchBox;
