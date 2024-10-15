'use client';

import { orderStatusLabels } from '@/lib/labels';
import { useOrdersStore } from '@/stores/use-orders-store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const OrderStatusSelect = () => {
  const { orderStatus, changeOrderStatus } = useOrdersStore();

  return (
    <Select value={orderStatus} onValueChange={changeOrderStatus}>
      <SelectTrigger className="md:w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(orderStatusLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
