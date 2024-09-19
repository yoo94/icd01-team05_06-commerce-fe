import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/cart-types';

interface PaymentProductsProps {
  books: CartItem[];
}

const PaymentProducts = ({ books }: PaymentProductsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>주문 상품 정보</CardTitle>
      </CardHeader>
      <CardContent>
        {books?.map((books) => (
          <div key={books.id} className="mb-4 flex items-center space-x-4">
            <img src={books.coverImage} alt={books.title} className="size-16 rounded" />
            <div>
              <p className="font-medium">{books.title}</p>
              <p className="text-gray-500">{books.selectNum}개</p>
              <p className="font-bold">{books.price}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentProducts;
