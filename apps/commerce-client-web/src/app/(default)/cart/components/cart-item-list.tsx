'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CartItem from './cart-item';
import { CartItem as CartItemType } from '@/types/cart-types';
import { getCartItems, clearCart } from '@/app/actions/cart-action';
import { CheckedState } from '@radix-ui/react-checkbox'; // CheckedState 타입 가져오기

const CartItemList = () => {
  const [items, setItems] = useState<CartItemType[]>([]); // 장바구니 항목
  const [checkedItems, setCheckedItems] = useState<number[]>([]); // 선택된 항목의 id 리스트

  // 장바구니 목록을 서버에서 가져와 상태 설정
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setItems(cartItems['products']);
        setCheckedItems([]); // 초기에는 아무 것도 선택되지 않음
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // 전체 삭제 핸들러
  const handleClearCart = async () => {
    try {
      await clearCart(); // 서버에서 전체 삭제
      setItems([]); // 상태 초기화
      setCheckedItems([]); // 체크 상태 초기화
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  // CheckedState를 boolean으로 변환하는 함수
  const toBoolean = (checked: CheckedState): boolean => {
    return checked === true; // true는 true, false나 "indeterminate"는 false로 변환
  };

  // 개별 항목 체크박스 상태 변경
  const handleCheckboxChange = (itemId: number, checked: CheckedState) => {
    const isChecked = toBoolean(checked);

    setCheckedItems((prevChecked) =>
      isChecked ? [...prevChecked, itemId] : prevChecked.filter((id) => id !== itemId),
    );
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = (checked: CheckedState) => {
    const isChecked = toBoolean(checked);

    if (isChecked) {
      setCheckedItems(items.map((item) => item.productId)); // 모든 항목 선택
    } else {
      setCheckedItems([]); // 모든 항목 선택 해제
    }
  };

  // 전체 선택 여부 확인
  const allSelected = items.length > 0 && checkedItems.length === items.length;

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
                onCheckedChange={(checked) => handleSelectAll(checked)}
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
              key={item.productId}
              item={item}
              checked={checkedItems.includes(item.productId)} // 개별 항목의 체크 상태 전달
              onCheckedChange={(checked) => handleCheckboxChange(item.productId, checked)} // 개별 체크박스 변경 핸들러 전달
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItemList;
