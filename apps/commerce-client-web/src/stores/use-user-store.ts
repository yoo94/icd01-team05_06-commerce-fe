import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserSession } from '@/types/auth-types';

export interface UserInfoFormData {
  password?: string;
  name: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
  detailAddress: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserState {
  userSession: UserSession | null;
  userInfoData: UserInfoFormData;
  passwordData: PasswordFormData;
  setUserSession: (session: UserSession) => void;
  setUserInfoData: (data: Partial<UserInfoFormData>) => void;
  setPasswordData: (data: PasswordFormData) => void;
  clearUserSession: () => void;
  clearUserInfoData: () => void;
  clearPasswordData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userSession: null,
      userInfoData: {
        name: '',
        phone: '',
        postalCode: '',
        streetAddress: '',
        detailAddress: '',
      },
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      setUserSession: (session: UserSession) => set({ userSession: session }),
      setUserInfoData: (data) =>
        set((state) => ({
          userInfoData: {
            ...state.userInfoData,
            ...data,
          },
        })),
      setPasswordData: (data: PasswordFormData) => set({ passwordData: data }),
      clearUserSession: () => set({ userSession: null }),
      clearUserInfoData: () =>
        set({
          userInfoData: {
            name: '',
            phone: '',
            postalCode: '',
            streetAddress: '',
            detailAddress: '',
          },
        }),
      clearPasswordData: () =>
        set({
          passwordData: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          },
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userSession: state.userSession,
      }),
    },
  ),
);
