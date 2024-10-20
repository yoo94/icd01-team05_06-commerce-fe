import create from 'zustand';
import { CartItem } from '@/types/cart-types';
import { z } from 'zod';
import {
  PaymentSchema,
  UserInfoSchema,
  ShippingInfoSchema,
  AgreementInfoSchema,
} from '@/schemas/order-schema';

interface PaymentState {
  depositorName: string;
  paymentMethod: string;
  orderBooks: CartItem[];
  bank: string;
  userInfo: { name: string; phone: string; email: string };
  shippingInfo: {
    recipient: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    memo: string;
  };
  agreementInfo: { termsOfService: boolean; privacyPolicy: boolean; ageVerification: boolean };

  setPaymentMethod: (method: string) => void;
  setDepositorName: (name: string) => void;
  setBank: (name: string) => void;
  setOrderBooks: (books: CartItem[]) => void;
  setUserInfo: (info: { name: string; phone: string; email: string }) => void;
  setShippingInfo: (info: {
    recipient: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    memo: string;
  }) => void;
  setAgreementInfo: (info: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    ageVerification: boolean;
  }) => void;
  validate: () => boolean;
  resetState: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  depositorName: '',
  paymentMethod: '',
  bank: '',
  orderBooks: [],
  userInfo: { name: '', phone: '', email: '' },
  shippingInfo: {
    recipient: '',
    phone: '',
    address: '',
    detailAddress: '',
    postalCode: '',
    memo: '',
  },
  agreementInfo: { termsOfService: false, privacyPolicy: false, ageVerification: false },

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setBank: (name) => set({ bank: name }),
  setDepositorName: (name) => set({ depositorName: name }),
  setOrderBooks: (books) => set({ orderBooks: books }),
  setUserInfo: (info) => set({ userInfo: info }),
  setShippingInfo: (info) => set({ shippingInfo: info }),
  setAgreementInfo: (info) => set({ agreementInfo: info }),
  validate: () => {
    const state = get();
    try {
      PaymentSchema.parse(state);
      UserInfoSchema.parse(state.userInfo);
      ShippingInfoSchema.parse(state.shippingInfo);
      AgreementInfoSchema.parse(state.agreementInfo);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 첫 번째 오류 메시지만 추출
        const firstErrorMessage = error.errors[0]?.message || '유효성 검사 오류가 발생했습니다.';
        alert(firstErrorMessage);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
      return false;
    }
  },

  resetState: () =>
    set({
      depositorName: '',
      paymentMethod: '',
      orderBooks: [],
      userInfo: { name: '', phone: '', email: '' },
      shippingInfo: {
        recipient: '',
        phone: '',
        address: '',
        detailAddress: '',
        postalCode: '',
        memo: '',
      },
      agreementInfo: { termsOfService: false, privacyPolicy: false, ageVerification: false },
    }),
}));
