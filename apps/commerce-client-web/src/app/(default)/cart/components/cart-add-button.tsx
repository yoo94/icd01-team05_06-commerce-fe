'use client';

import useCartStore from '@/stores/use-cart-store';
import { useToast } from '@/components/ui/use-toast';
import { Book } from '@/types/book-types';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';

interface AddToCartButtonProps {
  book: Book;
  quantity: number;
}

const AddToCartButton = ({ book, quantity }: AddToCartButtonProps) => {
  const addBook = useCartStore((state) => state.addBook);

  const { toast } = useToast();

  const handleAddToCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    addBook(book, quantity);
    toast({
      title: 'add to cart!',
      description: `${book.title}이(가) ${quantity}개가 장바구니에 추가되었습니다.`,
      action: (
        <div className="mt-4 flex w-full justify-end">
          <ToastAction altText="바로가기" className="border-slate-600">
            <Link href={'/cart'}>바로가기</Link>
          </ToastAction>
        </div>
      ),
      duration: 3000,
      className: 'max-w-2xl p-8 flex flex-col justify-between',
    });
  };

  return (
    <Button onClick={handleAddToCart} variant="outline" className="w-full">
      장바구니
    </Button>
  );
};

export default AddToCartButton;
