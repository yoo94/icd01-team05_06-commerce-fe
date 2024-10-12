'use server';

import { orderApi } from '@/lib/api';
import { getHeadersWithToken } from '@/app/actions/action-helper';
import { ApiResponse } from '@/types/api-types';
import { CartItem } from '@/types/cart-types';

interface CartItemsResponse {
  products: CartItem[];
}
export const getCartItems = async (): Promise<CartItemsResponse> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    // 장바구니 목록 조회 API 호출
    const response = await orderApi
      .get('shopping-carts', {
        headers,
      })
      .json<ApiResponse<CartItemsResponse>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch cart items');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    throw new Error('Failed to fetch cart items');
  }
};

/**
 * 장바구니 상품 등록
 * @param productId - 상품 ID
 * @param quantity - 수량
 */
export const addToCart = async (productId: number, quantity: number): Promise<void> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await orderApi
      .post('shopping-carts', {
        body: JSON.stringify({ productId, quantity }),
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to add item to cart');
    }

    console.log('Item added to cart successfully');
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw new Error('Failed to add item to cart');
  }
};

/**
 * 장바구니 상품 수량 변경
 * @param shoppingCartId - 장바구니 ID
 * @param quantity - 변경할 수량
 */
export const updateCartItemQuantity = async (
  shoppingCartId: number,
  quantity: number,
): Promise<void> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await orderApi
      .patch(`shopping-carts/${shoppingCartId}`, {
        body: JSON.stringify({ quantity }),
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to update cart item quantity');
    }

    console.log('Cart item quantity updated successfully');
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw new Error('Failed to update cart item quantity');
  }
};

/**
 * 장바구니 상품 삭제
 * @param shoppingCartId - 장바구니 ID
 */
export const removeFromCart = async (shoppingCartId: number): Promise<void> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await orderApi
      .delete(`shopping-carts/${shoppingCartId}`, {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to remove item from cart');
    }

    console.log('Item removed from cart successfully');
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw new Error('Failed to remove item from cart');
  }
};

/**
 * 장바구니 전체 비우기
 */
export const clearCart = async (): Promise<void> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await orderApi
      .post('shopping-carts/clear', {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to clear cart');
    }

    console.log('Cart cleared successfully');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
};
