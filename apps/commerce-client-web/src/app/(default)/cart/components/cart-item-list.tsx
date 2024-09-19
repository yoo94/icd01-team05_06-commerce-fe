'use client';

import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import CartItem from './cart-item';
import { Checkbox } from '@/components/ui/checkbox';

const CartItemList = ({}) => {
  const { items, removeAllBook, toggleAllBooks } = useCartStore();
  const allSelected = items.every((item) => item.selected);

  return (
    <div className="flex flex-col gap-y-5 overflow-x-auto">
      <Button variant="secondary" className="self-end" onClick={removeAllBook}>
        전체삭제
      </Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked: boolean) => toggleAllBooks(checked)}
                className="fill-primary cursor-pointer"
              />
            </TableHead>
            <TableHead className="whitespace-nowrap text-center">상품 정보</TableHead>
            <TableHead className="whitespace-nowrap text-center">수량</TableHead>
            <TableHead className="whitespace-nowrap text-center">주문 금액</TableHead>
            <TableHead className="whitespace-nowrap text-center">배송 정보</TableHead>
            <TableHead className="whitespace-nowrap text-center">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItemList;
