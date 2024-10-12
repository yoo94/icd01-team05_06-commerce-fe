'use client';

import { SortBy } from '@/types/order-types';
import { useOrdersStore } from '@/stores/use-orders-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SortBySelect = () => {
  const { sortBy, changeSortBy } = useOrdersStore();

  const buttons = [
    { value: SortBy.RECENT, label: '최근순' },
    { value: SortBy.ORDER_STATUS, label: '상태순' },
  ];

  return (
    <div className="flex rounded-md border border-gray-200">
      {buttons.map(({ value, label }) => (
        <Button
          key={value}
          variant={sortBy === value ? 'default' : 'outline'}
          className={cn(
            'overflow-hidden px-4 py-2 text-sm border-none',
            sortBy === SortBy.RECENT ? 'rounded-r-none' : 'rounded-l-none',
          )}
          onClick={() => changeSortBy(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default SortBySelect;
