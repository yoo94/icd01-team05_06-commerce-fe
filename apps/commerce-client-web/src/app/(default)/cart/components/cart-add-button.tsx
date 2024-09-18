import useCartStore from '@/stores/use-cart-store';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product-types';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';

const AddToCartButton = ({ product, quantity }: { product: Product; quantity: number }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const { toast } = useToast();

  const handleAddToCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    addProduct(product, quantity);
    toast({
      title: 'add to cart!',
      description: `${product.title}이(가) ${quantity ?? 1}개가 장바구니에 추가되었습니다.`,
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
