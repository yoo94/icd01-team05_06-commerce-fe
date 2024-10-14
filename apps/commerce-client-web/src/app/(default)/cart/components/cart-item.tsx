import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart-types';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
  checked: boolean; // 개별 체크박스의 선택 상태
  onCheckedChange: (checked: boolean) => void; // 체크박스 변경 핸들러
  onChangeQuantity: (shoppingCartId: number, value: number) => void; // 수량 변경 핸들러
  onRemoveItem: (shoppingCartId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  checked,
  onCheckedChange,
  onChangeQuantity,
  onRemoveItem,
}) => {
  const [inputQuantity, setInputQuantity] = useState(item.quantity); // 로컬 상태로 수량 관리
  const totalPrice = (parseInt(String(item.discountedPrice)) * item.quantity).toLocaleString();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 1) value = 1;

    setInputQuantity(value);
  };

  const handleQuantityUpdate = () => {
    if (inputQuantity !== item.quantity) {
      onChangeQuantity(item.shoppingCartId, inputQuantity);
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
          value={inputQuantity}
          min={1}
          className="w-20 rounded border text-center"
          onChange={handleQuantityChange}
          onBlur={handleQuantityUpdate}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleQuantityUpdate();
            }
          }}
        />
      </TableCell>
      <TableCell className="w-32 whitespace-nowrap text-center font-bold">{totalPrice}원</TableCell>
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
