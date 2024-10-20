import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem } from '@/types/cart-types';

interface PaymentSummaryProps {
  books: CartItem[];
  shippingCost?: number; // 배송비를 선택적 프롭스로 추가
}

const PaymentSummary = ({ books, shippingCost = 0 }: PaymentSummaryProps) => {
  const originalPrice = books.reduce((acc, book) => acc + book.price, 0).toLocaleString();

  const discount = books
    .reduce((acc, book) => acc + (book.price - book.discountedPrice || 0), 0)
    .toLocaleString();

  const totalPrice = books
    .reduce((acc, book) => acc + (book.price - (book.price - book.discountedPrice || 0)), 0)
    .toLocaleString();

  const totalAmount = (Number(totalPrice.replace(/,/g, '')) + shippingCost).toLocaleString();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">주문 요약</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 테이블 형식으로 변경 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 상품가격 */}
          <div className="text-sm font-light">상품가격</div>
          <div className="text-right">{originalPrice}원</div>

          {/* 배송비 */}
          <div className="text-sm font-light">배송비</div>
          <div className="text-right">{shippingCost > 0 ? `${shippingCost}원` : '무료배송'}</div>

          {/* 할인 금액 */}
          <div className="text-sm font-light">할인금액</div>
          <div className="text-right text-blue-500">-{discount}원</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-10 font-bold">
        <p>총 주문금액</p>
        <p>{totalAmount}원</p>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummary;
