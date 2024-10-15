import create from 'zustand';
import { CartItem } from '@/types/cart-types';
import {
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
  addToCart,
} from '@/app/actions/cart-action';

interface CartState {
  items: CartItem[];
  checkedItems: number[];
  fetchItems: () => Promise<void>;
  addItemToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (shoppingCartId: number, quantity: number) => Promise<void>;
  toggleItemSelection: (itemId: number, isChecked: boolean) => void;
  selectAllItems: (isChecked: boolean) => void;
  removeCartItems: (shoppingCartId: number) => Promise<void>;
  getSelectedBook: () => CartItem[]; // 선택된 책들을 반환하는 메서드
}

const useCartStore = create<CartState>((set, get) => {
  return {
    items: [],
    checkedItems: [],

    // 서버에서 장바구니 항목을 가져옴
    fetchItems: async () => {
      try {
        const cartItems = await getCartItems();
        set({ items: cartItems['products'], checkedItems: [] });
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },

    // 장바구니에 상품 추가
    addItemToCart: async (productId, quantity) => {
      try {
        await addToCart(productId, quantity);
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    },

    // 수량 업데이트 메서드
    updateQuantity: async (shoppingCartId, quantity) => {
      try {
        await updateCartItemQuantity(shoppingCartId, quantity);
        set((state) => ({
          items: state.items.map((item) =>
            item.shoppingCartId === shoppingCartId ? { ...item, quantity } : item,
          ),
        }));
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
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
      try {
        await removeFromCart(shoppingCartId);
        set((state) => ({
          items: state.items.filter((item) => item.shoppingCartId !== shoppingCartId),
          checkedItems: state.checkedItems.filter(
            (id) =>
              !state.items.some(
                (item) => item.shoppingCartId === shoppingCartId && item.productId === id,
              ),
          ),
        }));
      } catch (error) {
        console.error('Failed to remove cart item:', error);
      }
    },

    // 선택된 책들을 반환하는 메서드
    getSelectedBook: () => {
      const { items, checkedItems } = get();
      return items.filter((item) => checkedItems.includes(item.productId));
    },
  };
});

export default useCartStore;
