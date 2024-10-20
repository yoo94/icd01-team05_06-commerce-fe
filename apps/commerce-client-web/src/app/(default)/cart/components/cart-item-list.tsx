'use client';

import { useEffect } from 'react';

import useCartStore from '@/stores/use-cart-store';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useWithLoading } from '@/components/common/with-loading-spinner';
import CartActionButtons from './cart-action-buttons';
import CartItemsTable from './cart-item-table';
import CartMobileItem from './cart-mobile-item';
import CartEmptyState from './cart-empty-state';

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
    await updateQuantity(shoppingCartId, quantity);
    withLoading(fetchItems);
  };

  return (
    <div className="flex w-full flex-col gap-y-5">
      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <>
          <CartActionButtons
            allSelected={allSelected}
            onSelectAll={(checked) => withLoading(async () => selectAllItems(toBoolean(checked)))}
            onClearCart={handleClearCart}
          />

          {/* Desktop Design */}
          <CartItemsTable
            items={items}
            checkedItems={checkedItems}
            onToggleItem={toggleItemSelection}
            onRemoveItem={removeCartItems}
            onChangeQuantity={handleChangeQuantity}
            withLoading={withLoading}
          />

          {/* Mobile Design */}
          <div className="flex flex-col space-y-4 md:hidden">
            {items.map((item) => (
              <CartMobileItem
                key={item.shoppingCartId}
                item={item}
                checkedItems={checkedItems}
                onToggleItem={(productId, checked) => toggleItemSelection(productId, checked)}
                onRemoveItem={removeCartItems}
                onChangeQuantity={handleChangeQuantity}
                withLoading={withLoading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemList;
