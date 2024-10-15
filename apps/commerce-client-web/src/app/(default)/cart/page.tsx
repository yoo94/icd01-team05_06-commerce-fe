import CartItemList from './components/cart-item-list';
import CartSummary from './components/cart-summary';

const CartPage = () => {
  return (
    <div className="container mx-auto p-6">
      <CartItemList />
      <div className="mt-4 flex justify-end">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
