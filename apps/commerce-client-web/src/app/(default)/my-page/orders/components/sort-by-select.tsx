'use client';

import { SortBy } from '@/types/order-types';
import { useOrdersStore } from '@/stores/use-orders-store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortBySelect = () => {
  const { sortBy, changeSortBy } = useOrdersStore();

  return (
    <Select value={sortBy} onValueChange={changeSortBy}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SortBy.RECENT}>최근순</SelectItem>
          <SelectItem value={SortBy.ORDER_STATUS}>상태순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBySelect;
