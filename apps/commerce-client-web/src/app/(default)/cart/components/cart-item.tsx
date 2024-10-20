import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart-types';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onChangeQuantity: (shoppingCartId: number, value: number) => void;
  onRemoveItem: (shoppingCartId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  checked,
  onCheckedChange,
  onChangeQuantity,
  onRemoveItem,
}) => {
  const [inputValue, setInputValue] = useState(item.quantity);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 1) value = 1;
    if (value > 99) value = 99; // max 값 제한
    setInputValue(value);
  };

  const handleBlur = () => {
    if (inputValue !== item.quantity) {
      onChangeQuantity(item.shoppingCartId, inputValue);
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="text-center">
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
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
          value={inputValue}
          min={1}
          max={99}
          className="w-20 rounded border text-center"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell className="w-32 whitespace-nowrap text-center font-bold">
        {item.discountedPrice.toLocaleString()}원
      </TableCell>
      <TableCell className="text-center">{item.shippingInfo || '무료'}</TableCell>
      <TableCell className="text-center">
        <Button
          variant="outline"
          className="text-xs text-slate-500 hover:bg-red-50"
          onClick={() => {
            onRemoveItem(item.shoppingCartId);
          }}
        >
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
