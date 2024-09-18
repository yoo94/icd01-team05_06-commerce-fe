'use client';

import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { Book } from '@/types/book-types';
import { useRouter } from 'next/navigation';

interface CartActionsProps {
  book: Book;
}

const CartActions = ({ book }: CartActionsProps) => {
  const { addBook, updateBookQuantity, items } = useCartStore();
  const router = useRouter(); // next/router 훅 사용

  const cartItem = items.find((item) => item.id === book.id);
  const quantity = cartItem ? cartItem.selectNum : 0;

  const handleAddToCartAndRedirect = () => {
    addBook(book);
    router.push('/cart'); // 장바구니로 이동
  };

  const handleIncreaseQuantity = () => {
    updateBookQuantity(book.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateBookQuantity(book.id, quantity - 1);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="rounded-lg border border-gray-300 px-3 py-1 text-lg hover:bg-gray-200"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
      <Button variant="secondary" className="w-full" onClick={handleAddToCartAndRedirect}>
        장바구니
      </Button>
      <Button className="mt-2.5 w-full">바로구매</Button>
    </div>
  );
};

export default CartActions;
