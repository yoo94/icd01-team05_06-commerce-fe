import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SearchOptionSelect() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">주문전체</SelectItem>
          <SelectItem value="orderer">주문자</SelectItem>
          <SelectItem value="recipient">수령자</SelectItem>
          <SelectItem value="order-number">주문번호</SelectItem>
          <SelectItem value="product-name">상품명</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
