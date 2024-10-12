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
  authToken: string;
  setUserSession: (session: UserSession) => void;
  setUserInfoData: (data: Partial<UserInfoFormData>) => void;
  setAuthToken: (token: string) => void;
  clearUserSession: () => void;
  clearUserInfoData: () => void;
  clearAuthToken: () => void;
  reset: () => void; // Add reset function to clear all user data
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
      authToken: '',

      // Function to set user session
      setUserSession: (session: UserSession) => set({ userSession: session }),

      // Function to set user info data
      setUserInfoData: (data) =>
        set((state) => ({
          userInfoData: {
            ...state.userInfoData,
            ...data,
          },
        })),

      // Function to set auth token
      setAuthToken: (token: string) => set({ authToken: token }),

      // Function to clear user session
      clearUserSession: () => set({ userSession: null }),

      // Function to clear user info data
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

      // Function to clear auth token
      clearAuthToken: () => set({ authToken: '' }),

      // Reset function to clear all state
      reset: () =>
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
          authToken: '',
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
