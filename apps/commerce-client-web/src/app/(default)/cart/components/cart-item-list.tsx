import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import CartItem from './cart-item';

const CartItemList = ({}) => {
  const { items, removeAllBook, toggleAllBooks } = useCartStore();
  const allSelected = items.every((item) => item.selected);

  return (
    <div className="overflow-x-auto">
      <Button onClick={removeAllBook}>전체삭제</Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleAllBooks(e.target.checked)}
                className="cursor-pointer"
              />
            </TableHead>
            <TableHead>상품 정보</TableHead>
            <TableHead>수량</TableHead>
            <TableHead>주문 금액</TableHead>
            <TableHead>배송 정보</TableHead>
            <TableHead>삭제</TableHead>
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
