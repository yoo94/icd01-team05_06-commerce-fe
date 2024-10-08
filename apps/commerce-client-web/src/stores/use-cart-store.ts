// stores/cart-store.ts
import create from 'zustand';
import { CartItem } from '@/types/cart-types';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '@/app/actions/cart-action';

interface CartState {
  items: CartItem[];
  checkedItems: number[];
  fetchItems: () => Promise<void>;
  updateQuantity: (shoppingCartId: number, quantity: number) => void;
  toggleItemSelection: (itemId: number, isChecked: boolean) => void;
  selectAllItems: (isChecked: boolean) => void;
  removeCartItems: (shoppingCartId: number) => Promise<void>;
}

const useCartStore = create<CartState>((set, _get) => ({
  items: [],
  checkedItems: [],

  // 서버에서 장바구니 항목을 가져옴
  fetchItems: async () => {
    const cartItems = await getCartItems();
    set({ items: cartItems['products'], checkedItems: [] });
  },

  // 수량 업데이트 메서드
  updateQuantity: async (shoppingCartId, quantity) => {
    await updateCartItemQuantity(shoppingCartId, quantity);
    set((state) => ({
      items: state.items.map((item) =>
        item.shoppingCartId === shoppingCartId ? { ...item, quantity } : item,
      ),
    }));
  },

  // 개별 항목 선택 상태 변경
  toggleItemSelection: (itemId, isChecked) => {
    set((state) => ({
      checkedItems: isChecked
        ? [...state.checkedItems, itemId]
        : state.checkedItems.filter((id) => id !== itemId),
    }));
  },

  // 전체 선택/해제 메서드
  selectAllItems: (isChecked) => {
    set((state) => ({
      checkedItems: isChecked ? state.items.map((item) => item.productId) : [],
    }));
  },

  // 개별 장바구니 항목 삭제 메서드
  removeCartItems: async (shoppingCartId) => {
    await removeFromCart(shoppingCartId);

    set((state) => ({
      // 삭제된 아이템을 제외한 나머지 항목으로 업데이트
      items: state.items.filter((item) => item.shoppingCartId !== shoppingCartId),

      // 삭제된 아이템의 productId를 checkedItems에서 제거
      checkedItems: state.checkedItems.filter(
        (id) =>
          !state.items.some(
            (item) => item.shoppingCartId === shoppingCartId && item.productId === id,
          ),
      ),
    }));
  },
}));

export default useCartStore;
