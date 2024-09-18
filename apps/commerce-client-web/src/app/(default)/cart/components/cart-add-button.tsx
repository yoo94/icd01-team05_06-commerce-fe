import useCartStore from '@/stores/use-cart-store';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product-types';
import { Button } from '@/components/ui/button';

const AddToCartButton = ({ product }: { product: Product }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const { toast } = useToast();

  const handleAddToCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    addProduct(product);
    toast({
      title: 'add to cart!',
      description: `${product.title}이(가) 장바구니에 추가되었습니다.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} variant="secondary" className="w-24">
      장바구니
    </Button>
  );
};

export default AddToCartButton;
