'use client';

import { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CartItem from './cart-item';
import useCartStore from '@/stores/use-cart-store';
import { CheckedState } from '@radix-ui/react-checkbox';

const CartItemList = () => {
  const {
    items,
    checkedItems,
    fetchItems,
    toggleItemSelection,
    selectAllItems,
    removeCartItems,
    updateQuantity,
  } = useCartStore();

  // 장바구니 아이템을 처음 로드할 때 가져옴
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 전체 선택 여부 확인
  const allSelected = items.length > 0 && checkedItems.length === items.length;

  const toBoolean = (checked: CheckedState): boolean => checked === true;

  return (
    <div className="flex flex-col gap-y-5 overflow-x-auto">
      <Button
        variant="secondary"
        className="self-end"
        onClick={() => items.map((item) => removeCartItems(item.shoppingCartId))}
      >
        전체삭제
      </Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => selectAllItems(toBoolean(checked))}
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
            <CartItem
              key={item.shoppingCartId}
              item={item}
              checked={checkedItems.includes(item.productId)}
              onCheckedChange={(checked) => toggleItemSelection(item.productId, toBoolean(checked))}
              onRemoveItem={() => removeCartItems(item.shoppingCartId)}
              onChangeQuantity={updateQuantity}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItemList;
