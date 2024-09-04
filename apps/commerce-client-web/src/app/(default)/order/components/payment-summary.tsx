import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/cartTypes';

const PaymentSummary: React.FC<{ products: CartItem[] }> = ({ products }) => {
  const totalPrice = products
    .reduce((acc, product) => acc + parseInt(product.price) * product.selectNum, 0)
    .toLocaleString();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>주문 요약</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>상품가격</p>
          <p>{totalPrice}원</p>
        </div>
        <div className="flex justify-between">
          <p>배송비</p>
          <p>+무료</p>
        </div>
        <div className="mt-4 flex justify-between font-bold">
          <p>총 주문금액</p>
          <p>{totalPrice}원</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
