import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/carttypes';

interface PaymentSummaryProps {
  products: CartItem[];
  shippingCost?: number; // 배송비를 선택적 프롭스로 추가
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ products, shippingCost = 0 }) => {
  const totalPrice = products
    .reduce((acc, product) => acc + Number(product.price) * product.selectNum, 0)
    .toLocaleString();

  const totalAmount = (Number(totalPrice.replace(/,/g, '')) + shippingCost).toLocaleString();

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
          <p>{totalAmount}원</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
