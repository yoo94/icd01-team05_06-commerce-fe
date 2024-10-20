import { ShoppingCart } from 'lucide-react'; // Use Lucide icons or any other icon library you prefer
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CartEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-slate-100 px-4 py-16">
      <ShoppingCart className="size-12 text-gray-400 md:size-16" />
      <h2 className="mt-4 text-sm font-semibold text-gray-600 sm:text-base">
        장바구니에 담긴 상품이 없습니다.
      </h2>
      <p className="mt-2 text-xs text-gray-500 sm:text-sm">
        원하시는 상품을 장바구니에 추가해보세요!
      </p>
      <Link href="/search">
        <Button variant="default" className="mt-6">
          상품 보러가기
        </Button>
      </Link>
    </div>
  );
};

export default CartEmptyState;
