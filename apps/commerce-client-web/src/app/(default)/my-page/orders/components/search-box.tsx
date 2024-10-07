import { Button } from '@/components/ui/button';
import DatePicker from '@/components/common/date-picker';
import SortOptionSelect from './sort-option-select';
import OrderStatusSelect from './order-status-select';

const SearchBox = () => {
  return (
    <div className="border-primary flex flex-col gap-3 rounded-lg border-2 p-4">
      <div>
        <div className="flex items-center gap-2">
          <span>조회 기간</span>
          <DatePicker />
          <span>~</span>
          <DatePicker />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-2">
            <span>정렬 기준</span>
            <SortOptionSelect />
          </div>
          <div className="flex items-center gap-2">
            <span>주문 상태</span>
            <OrderStatusSelect />
          </div>
        </div>
        <Button>조회</Button>
      </div>
    </div>
  );
};

export default SearchBox;
