import { Product } from '@/types/productTypes';

export interface CartItem extends Product {
  imgSrc: string | undefined;
  imageUrl: string | undefined;
  selectNum: number; // 선택한 수량
  selected: boolean; // 선택 여부
  shippingInfo: string; // 배송 정보 추가
}
