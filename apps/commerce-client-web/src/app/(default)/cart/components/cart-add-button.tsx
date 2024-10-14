'use client';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';
import { Product } from '@/types/product-types';
import { useLoading } from '@/components/common/loading-context'; // useLoading 훅 임포트
import useCartStore from '@/stores/use-cart-store';

interface AddToCartButtonProps {
  book: Product;
  quantity: number;
}

const AddToCartButton = ({ book, quantity }: AddToCartButtonProps) => {
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const { addItemToCart } = useCartStore();

  const handleAddToCart = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await addItemToCart(book.id, quantity);
      toast({
        title: 'Added to cart!',
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
    } catch (error) {
      toast({
        title: 'Error',
        description: `장바구니 추가에 실패했습니다. 다시 시도해주세요.`,
        duration: 3000,
      });
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <Button onClick={handleAddToCart} variant="outline" className="w-full">
      장바구니
    </Button>
  );
};

export default AddToCartButton;
