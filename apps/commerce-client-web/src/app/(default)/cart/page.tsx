import CartItemList from './components/cart-item-list';
import CartSummary from './components/cart-summary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CartPage = () => {
  return (
    <div className="container mx-auto p-6">
      <CartItemList />
      <div className="mt-4 flex justify-end">
        <CartSummary />
      </div>
      <Button asChild className="mt-10 w-full">
        <Link href={'/order'}>주문하기</Link>
      </Button>
    </div>
  );
};

export default CartPage;
