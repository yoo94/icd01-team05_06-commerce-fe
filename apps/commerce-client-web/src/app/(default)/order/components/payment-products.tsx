import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/carttypes';

interface PaymentProductsProps {
  products: CartItem[];
}

const PaymentProducts = ({ products }: PaymentProductsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>주문 상품 정보</CardTitle>
      </CardHeader>
      <CardContent>
        {products?.map((product) => (
          <div key={product.id} className="mb-4 flex items-center space-x-4">
            <img src={product.imgSrc} alt={product.title} className="size-16 rounded" />
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-gray-500">{product.selectNum}개</p>
              <p className="font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentProducts;