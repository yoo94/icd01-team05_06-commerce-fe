'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart-types';
import { Checkbox } from '@/components/ui/checkbox';
import usecartstore from '@/stores/use-cart-store';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeBook, updateBookQuantity, updateBookSelection } = usecartstore();
  const totalPrice = (
    parseInt(String(item.price - item.discount)) * item.selectNum
  ).toLocaleString();

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="text-center">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked: boolean) => updateBookSelection(item.id, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center space-x-4">
        <Image
          src={item.coverImage}
          alt={item.title}
          width={64}
          height={64}
          className="mr-5 size-16 rounded"
        />

        {item.title}
      </TableCell>
      <TableCell className="text-left">
        <Input
          type="number"
          value={item.selectNum}
          min={1}
          onChange={(e) => updateBookQuantity(item.id, parseInt(e.target.value))}
          className="w-20 rounded border text-center"
        />
      </TableCell>
      <TableCell className="text-left font-bold">{totalPrice}원</TableCell>
      <TableCell className="text-left">{item.shippingInfo || '무료'}</TableCell>
      <TableCell className="text-left">
        <Button
          variant="outline"
          onClick={() => removeBook(item.id)}
          className="text-red-600 hover:bg-red-50"
        >
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
