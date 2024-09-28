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
  const totalPrice = (parseInt(String(item.discountedPrice)) * item.selectNum).toLocaleString();

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="text-center">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked: boolean) => updateBookSelection(item.id, checked)}
        />
      </TableCell>
      <TableCell className="flex items-center space-x-4 font-light">
        <Image
          src={item.coverImage}
          alt={item.title}
          width={120}
          height={64}
          className="mr-5 rounded"
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
      <TableCell className="whitespace-nowrap text-center font-bold">{totalPrice}원</TableCell>
      <TableCell className="text-center">{item.shippingInfo || '무료'}</TableCell>
      <TableCell className="text-center">
        <Button
          variant="outline"
          onClick={() => removeBook(item.id)}
          className="text-xs text-slate-500 hover:bg-red-50"
        >
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
