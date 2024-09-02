'use client';
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cartTypes';
import { Checkbox } from '@/components/ui/checkbox';
import useCartStore from '@/stores/useCartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeProduct, updateProductQuantity, updateProductSelection } = useCartStore();
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="text-center">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked: boolean) => updateProductSelection(item.id, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.title} className="size-16 rounded" />
        {item.title}
      </TableCell>
      <TableCell className="text-left">
        <Input
          type="number"
          value={item.selectNum}
          min={1}
          onChange={(e) => updateProductQuantity(item.id, parseInt(e.target.value))}
          className="w-20 rounded border text-center"
        />
      </TableCell>
      <TableCell className="text-left font-bold">
        {(parseInt(item.price) * item.selectNum).toLocaleString()}원
      </TableCell>
      <TableCell className="text-left">{item.shippingInfo || '무료'}</TableCell>
      <TableCell className="text-left">
        <Button
          variant="outline"
          onClick={() => removeProduct(item.id)}
          className="text-red-600 hover:bg-red-50"
        >
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
