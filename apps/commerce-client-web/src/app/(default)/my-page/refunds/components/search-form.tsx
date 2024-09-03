import { Button } from '@/components/ui/button';
import YearSelect from '@/app/(default)/my-page/refunds/components/year-select';
import MonthSelect from '@/app/(default)/my-page/refunds/components/month-select';

export default function SearchForm() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        <Button size="sm" variant="outline">
          1개월
        </Button>
        <Button size="sm" variant="outline">
          2개월
        </Button>
        <Button size="sm" variant="outline">
          3개월
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <YearSelect />년
          <MonthSelect />월
        </div>
        <span>~</span>
        <div className="flex items-center gap-1">
          <YearSelect />년
          <MonthSelect />월
        </div>
        <Button size="sm">조회</Button>
      </div>
    </div>
  );
}
