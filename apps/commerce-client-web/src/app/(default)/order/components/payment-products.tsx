import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/cart-types';
import Image from 'next/image';

interface PaymentProductsProps {
  books: CartItem[];
}

const PaymentProducts = ({ books }: PaymentProductsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">주문 상품 정보</CardTitle>
      </CardHeader>
      <CardContent>
        {books?.map((product) => (
          <div key={`${product.id}`} className="mb-4 flex items-center space-x-4">
            {/* 상품 이미지 */}
            <Image
              src={product.coverImage}
              alt={product.title}
              width={80}
              height={50}
              className="rounded"
              style={{ width: 'auto', height: 'auto' }} // 이미지 비율 유지
            />

            {/* 상품 정보 */}
            <div className="flex grow items-center justify-between gap-x-4">
              <p className="flex-1 text-sm font-extralight">{product.title}</p>
              <p className="text-sm">{product.quantity}개</p>
              <p className="font-bold">{product.discountedPrice.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentProducts;
