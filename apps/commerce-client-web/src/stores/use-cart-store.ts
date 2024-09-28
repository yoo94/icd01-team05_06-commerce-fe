import { CartItem } from '@/types/cart-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product-types';

export interface CartState {
  items: CartItem[];
  addBook: (book: Product, quantity?: number) => void;
  removeBook: (id: number) => void;
  removeAllBook: () => void;
  updateBookQuantity: (id: number, selectNum: number) => void;
  updateBookSelection: (id: number, selected: boolean) => void;
  toggleAllBooks: (selected: boolean) => void;
  getSelectedBook: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addBook: (book: Product, quantity: number = 1) =>
        set((state) => {
          // Check if the book already exists in the cart
          if (!book || !book.id || !quantity) {
            return state;
          }
          const existingBook = state.items.find((item) => item.id === book.id);
          if (existingBook) {
            // Increment the quantity if the book exists
            return {
              items: state.items.map((item) =>
                item.id === book.id ? { ...item, selectNum: item.selectNum + quantity } : item,
              ),
            };
          } else {
            // Add a new book to the cart
            return {
              items: [
                ...state.items,
                {
                  ...book,
                  selectNum: quantity,
                  selected: true,
                  shippingInfo: '무료',
                } as CartItem, // Ensure the new item is typed as CartItem
              ],
            };
          }
        }),
      removeBook: (id: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeAllBook: () => set(() => ({ items: [] })),
      updateBookQuantity: (id: number, selectNum: number) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, selectNum } : item)),
        })),
      updateBookSelection: (id: number, selected: boolean) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, selected } : item)),
        })),
      toggleAllBooks: (selected: boolean) =>
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected })),
        })),
      getSelectedBook: () => {
        const state = get();
        return state.items.filter((item) => item.selected);
      },
    }),
    {
      name: 'cart-storage', // This is the name of the localStorage key
    },
  ),
);

export default useCartStore;
