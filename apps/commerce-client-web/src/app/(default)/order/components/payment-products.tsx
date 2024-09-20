import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/cart-types';
import Image from 'next/image';

interface PaymentProductsProps {
  products: CartItem[];
}

const PaymentProducts = ({ products }: PaymentProductsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">주문 상품 정보</CardTitle>
      </CardHeader>
      <CardContent>
        {products?.map((product) => (
          <div key={product.id} className="mb-4 flex items-center space-x-4">
            {/* 상품 이미지 */}
            <Image
              src={product.coverImage}
              alt={product.title}
              width={80}
              height={50}
              className="rounded"
            />

            {/* 상품 정보 */}
            <div className="flex grow items-center justify-between gap-x-4">
              <p className="flex-1 text-sm font-extralight">{product.title}</p>{' '}
              {/* 텍스트 오버플로우 */}
              <p className="text-sm">{product.selectNum}개</p>
              <p className="font-bold">{Number(product.price).toLocaleString()}원</p>{' '}
              {/* 가격에 toLocaleString 적용 */}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentProducts;
