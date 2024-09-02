import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function OrderStatusSelect() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="order-received">주문접수</SelectItem>
          <SelectItem value="payment-confirmed">결제확인</SelectItem>
          <SelectItem value="shipping-instructed">출하지시</SelectItem>
          <SelectItem value="shipped">출고완료</SelectItem>
          <SelectItem value="delivery-completed">배송완료</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
