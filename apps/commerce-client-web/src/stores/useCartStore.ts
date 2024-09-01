import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/productTypes';
import { CartItem } from '@/types/cartTypes';

export interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  removeAllProduct: () => void;
  updateProductQuantity: (id: number, selectNum: number) => void;
  updateProductSelection: (id: number, selected: boolean) => void;
  toggleAllProducts: (selected: boolean) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set: (partial: Partial<CartState> | ((state: CartState) => Partial<CartState>)) => void) => ({
      items: [],
      addProduct: (product: Product) =>
        set((state: CartState) => {
          // 장바구니에 동일한 상품이 있는지 확인
          const existingProduct = state.items.find((item: CartItem) => item.id === product.id);
          if (existingProduct) {
            // 동일한 상품이 있으면 수량 증가
            return {
              items: state.items.map((item: CartItem) =>
                item.id === product.id ? { ...item, selectNum: item.selectNum + 1 } : item,
              ),
            };
          } else {
            // 새로운 상품 추가
            return {
              items: [
                ...state.items,
                { ...product, selectNum: 1, selected: true, shippingInfo: '무료' },
              ],
            };
          }
        }),
      removeProduct: (id: number) =>
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.id !== id),
        })),
      removeAllProduct: () =>
        set(() => ({
          items: [],
        })),
      updateProductQuantity: (id: number, selectNum: number) =>
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.id === id ? { ...item, selectNum } : item,
          ),
        })),
      updateProductSelection: (id: number, selected: boolean) =>
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.id === id ? { ...item, selected } : item,
          ),
        })),
      toggleAllProducts: (selected: boolean) =>
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) => ({ ...item, selected })),
        })),
    }),
    {
      name: 'cart-storage',
    },
  ),
);

export default useCartStore;
