import DatePicker from '@/components/date-picker';
import { Button } from '@/components/ui/button';

export default function SearchForm() {
  return (
    <div className="flex items-center justify-end gap-4 rounded-lg border-2 border-primary p-4">
      <div className="flex items-center gap-1">
        <DatePicker />
        <span>~</span>
        <DatePicker />
      </div>
      <Button>조회</Button>
    </div>
  );
}
