import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import CartItem from './cart-item';
import { CartItem as CartItemType } from '@/types/cart-types';
import { Checkbox } from '@/components/ui/checkbox';

type CartItemsTableProps = {
  items: CartItemType[];
  checkedItems: number[];
  onToggleItem: (productId: number, checked: boolean) => void;
  onRemoveItem: (shoppingCartId: number) => void;
  onChangeQuantity: (shoppingCartId: number, quantity: number) => void;
  withLoading: (fn: () => Promise<void>) => void;
};

const CartItemsTable = ({
  items,
  checkedItems,
  onToggleItem,
  onRemoveItem,
  onChangeQuantity,
  withLoading,
}: CartItemsTableProps) => {
  // Convert CheckedState to boolean explicitly to prevent type issues
  const toBoolean = (checked: string | boolean): boolean => checked === true || checked === 'true';

  return (
    <Table className="hidden min-w-full divide-y divide-slate-200 md:table">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={items.length > 0 && checkedItems.length === items.length}
              onCheckedChange={async (checked) =>
                withLoading(async () => onToggleItem(items[0].productId, toBoolean(checked)))
              }
              className="cursor-pointer"
            />
          </TableHead>
          <TableHead className="whitespace-nowrap text-center">상품 정보</TableHead>
          <TableHead className="whitespace-nowrap text-center">수량</TableHead>
          <TableHead className="whitespace-nowrap text-center">주문 금액</TableHead>
          <TableHead className="hidden whitespace-nowrap text-center md:table-cell">삭제</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <CartItem
            key={item.shoppingCartId}
            item={item}
            checked={checkedItems.includes(item.productId)}
            onCheckedChange={async (checked) =>
              withLoading(async () => onToggleItem(item.productId, toBoolean(checked)))
            }
            onRemoveItem={() => onRemoveItem(item.shoppingCartId)}
            onChangeQuantity={onChangeQuantity}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CartItemsTable;
