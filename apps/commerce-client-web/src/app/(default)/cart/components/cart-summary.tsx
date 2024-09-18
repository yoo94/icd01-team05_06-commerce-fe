import useCartStore from '@/stores/use-cart-store';

const CartSummary = () => {
  const { items } = useCartStore();
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + parseInt(String(item.price)) * item.selectNum, 0)
    .toLocaleString();

  return (
    <div className="mt-8 flex justify-end">
      <div className="text-right">
        <div className="mb-2 text-lg font-semibold">
          총 주문 상품 {items.filter((item) => item.selected).length}개
        </div>
        <div className="text-2xl font-bold">{totalPrice}원</div>
      </div>
    </div>
  );
};

export default CartSummary;
