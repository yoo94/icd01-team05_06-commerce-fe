import create from 'zustand';
import { CartItem } from '@/types/cart-types';

interface PaymentState {
  depositorName: string; // Add depositorName field
  paymentMethod: string;
  orderBooks: CartItem[];
  userInfo: {
    name: string;
    phone: string;
    email: string;
  };
  shippingInfo: {
    recipient: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    memo: string;
  };
  agreementInfo: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    ageVerification: boolean;
  };
  setPaymentMethod: (method: string) => void;
  setDepositorName: (name: string) => void; // Setter for depositorName
  setOrderBooks: (books: CartItem[]) => void;
  setUserInfo: (userInfo: { name: string; phone: string; email: string }) => void;
  setShippingInfo: (shippingInfo: {
    recipient: string;
    phone: string;
    address: string;
    detailAddress: string;
    postalCode: string;
    memo: string;
  }) => void;
  setAgreementInfo: (agreementInfo: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    ageVerification: boolean;
  }) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  depositorName: '', // Initialize depositorName
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
  agreementInfo: {
    termsOfService: false,
    privacyPolicy: false,
    ageVerification: false,
  },

  setDepositorName: (name) => set({ depositorName: name }), // Setter for depositorName
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setOrderBooks: (books) => set({ orderBooks: books }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setShippingInfo: (shippingInfo) => set({ shippingInfo }),
  setAgreementInfo: (agreementInfo) => set({ agreementInfo }),
}));
