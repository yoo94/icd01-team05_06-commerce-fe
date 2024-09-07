import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePicker from '@/components/common/date-picker';
import PeriodSelect from './period-select';
import SearchOptionSelect from './search-option-select';

export default function SearchBox() {
  return (
    <div className="border-primary flex flex-col gap-3 rounded-lg border-2 p-4">
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
