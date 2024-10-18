'use client';

import { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CartItem from './cart-item';
import useCartStore from '@/stores/use-cart-store';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useWithLoading } from '@/components/common/with-loading-spinner';

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
  const withLoading = useWithLoading();

  useEffect(() => {
    withLoading(fetchItems);
  }, [fetchItems, updateQuantity]);

  const allSelected = items.length > 0 && checkedItems.length === items.length;

  const toBoolean = (checked: CheckedState): boolean => checked === true;

  const handleClearCart = () => {
    withLoading(async () => {
      await Promise.all(items.map((item) => removeCartItems(item.shoppingCartId)));
    });
  };
  const handleChangeQuantity = async (shoppingCartId: number, quantity: number) => {
    // 수량 업데이트 로직 후 fetchItems 호출
    await updateQuantity(shoppingCartId, quantity);
    withLoading(fetchItems); // 수량 변경 후 아이템들을 다시 가져옴
  };
  return (
    <div className="flex flex-col gap-y-5 overflow-x-auto">
      <Button variant="secondary" className="self-end" onClick={handleClearCart}>
        전체삭제
      </Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) =>
                  withLoading(async () => selectAllItems(toBoolean(checked)))
                }
                className="cursor-pointer"
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
              onCheckedChange={(checked) =>
                withLoading(async () => toggleItemSelection(item.productId, toBoolean(checked)))
              }
              onRemoveItem={() => withLoading(() => removeCartItems(item.shoppingCartId))}
              onChangeQuantity={handleChangeQuantity}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItemList;
