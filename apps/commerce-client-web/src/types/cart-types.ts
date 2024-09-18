import { Book } from '@/types/book-types';

export interface CartItem extends Book {
  selectNum: number; // 선택한 수량
  selected: boolean; // 선택 여부
  shippingInfo: string; // 배송 정보 추가
  imageUrl: string;
}
