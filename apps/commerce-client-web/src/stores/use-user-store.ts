import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserSession } from '@/types/auth-types';

export interface UserInfoFormData {
  name: string;
  phone: string;
  password?: string;
  postalCode: string;
  streetAddress: string;
  detailAddress: string;
}

interface UserState {
  userSession: UserSession | null;
  userInfoData: UserInfoFormData;
  authToken: string | null;
  setUserSession: (session: UserSession) => void;
  setUserInfoData: (data: Partial<UserInfoFormData>) => void;
  setAuthToken: (token: string) => void;
  clearUserSession: () => void;
  clearUserInfoData: () => void;
  clearAuthToken: () => void;
  resetUserState: () => void; // Add reset function to clear all user data
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userSession: null,
      userInfoData: {
        name: '',
        phone: '',
        password: undefined,
        postalCode: '',
        streetAddress: '',
        detailAddress: '',
      },
      authToken: null,

      setUserSession: (session: UserSession) => set({ userSession: session }),
      setUserInfoData: (data) =>
        set((state) => ({
          userInfoData: {
            ...state.userInfoData,
            ...data,
          },
        })),
      setAuthToken: (token: string) => set({ authToken: token }),

      clearUserSession: () => set({ userSession: null }),
      clearUserInfoData: () =>
        set({
          userInfoData: {
            name: '',
            phone: '',
            password: undefined,
            postalCode: '',
            streetAddress: '',
            detailAddress: '',
          },
        }),
      clearAuthToken: () => set({ authToken: '' }),

      resetUserState: () =>
        set({
          userSession: null,
          userInfoData: {
            name: '',
            phone: '',
            password: undefined,
            postalCode: '',
            streetAddress: '',
            detailAddress: '',
          },
          authToken: null,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userSession: state.userSession,
        authToken: state.authToken,
      }),
    },
  ),
);
