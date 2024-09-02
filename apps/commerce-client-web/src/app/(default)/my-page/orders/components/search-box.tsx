import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PeriodSelect from '@/app/(default)/my-page/orders/components/period-select';
import DatePicker from '@/app/(default)/my-page/orders/components/date-picker';
import SearchOptionSelect from '@/app/(default)/my-page/orders/components/search-option-select';

export default function SearchBox() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-2 border-primary p-4">
      <div>
        <div className="flex items-center gap-4">
          <PeriodSelect />
          <div className="flex items-center gap-1">
            <DatePicker />
            <span>~</span>
            <DatePicker />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <SearchOptionSelect />
        <Input />
        <Button>조회</Button>
      </div>
    </div>
  );
}
