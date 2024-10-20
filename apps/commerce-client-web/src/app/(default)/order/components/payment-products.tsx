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
          <div
            key={`${product.id}`}
            className="mb-4 flex items-center space-x-4 md:flex-row md:items-center md:space-x-4"
          >
            {/* Desktop Image */}
            <Image
              src={product.coverImage}
              alt={product.title}
              width={80}
              height={50}
              className="hidden rounded md:block"
              style={{ width: 'auto', height: 'auto' }} // Maintain image aspect ratio
            />

            {/* Mobile Image */}
            <Image
              src={product.coverImage}
              alt={product.title}
              width={100}
              height={70}
              className="block w-full rounded md:hidden"
            />

            {/* Product Information */}
            <div className="flex flex-col md:grow md:flex-row md:items-center md:justify-between md:gap-x-4">
              <p className="text-sm font-extralight md:flex-1">{product.title}</p>
              <p className="mt-2 text-sm md:mt-0">{product.quantity}개</p>
              <p className="mt-1 font-bold md:mt-0">{product.discountedPrice.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentProducts;
