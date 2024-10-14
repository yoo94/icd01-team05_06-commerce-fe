import { Product } from '@/types/product-types';

export interface CartItem extends Product {
  productId: number;
  shoppingCartId: number;
  quantity: number;
  selectNum: number; // 선택한 수량
  selected: boolean; // 선택 여부
  shippingInfo: string; // 배송 정보 추가
  imageUrl?: string | undefined;
}
