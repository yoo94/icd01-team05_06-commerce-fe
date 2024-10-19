import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { getCookie } from 'cookies-next';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
  detailAddress: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

interface AuthStore {
  signupData: SignupFormData;
  loginData: LoginFormData;
  saveId: boolean;
  isLoggedIn: boolean;
  setSignupData: (data: Partial<SignupFormData>) => void;
  setLoginData: (data: Partial<LoginFormData>) => void;
  resetSignupData: () => void;
  resetLoginData: () => void;
  setSaveId: (save: boolean) => void;
  setLoginState: (state: boolean) => void;
  checkLoginState: () => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        saveId: false,
        signupData: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          postalCode: '',
          streetAddress: '',
          detailAddress: '',
        },
        loginData: {
          email: '',
          password: '',
        },
        passwordData: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        isLoggedIn: false, // Default login state is false
        setSignupData: (data) =>
          set((state) => ({
            signupData: {
              ...state.signupData,
              ...data,
            },
          })),
        setLoginData: (data) =>
          set((state) => ({
            loginData: {
              ...state.loginData,
              ...data,
            },
          })),
        resetSignupData: () =>
          set({
            signupData: {
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              phone: '',
              postalCode: '',
              streetAddress: '',
              detailAddress: '',
            },
          }),
        resetLoginData: () =>
          set((state) => ({
            loginData: {
              email: state.saveId ? state.loginData.email : '',
              password: '',
            },
          })),
        setSaveId: (save) => set({ saveId: save }),
        setLoginState: (state) => set({ isLoggedIn: state }),
        checkLoginState: () => {
          const token = getCookie('accessToken');
          set({ isLoggedIn: !!token });
        },
        resetAuthState: () => {
          set({
            isLoggedIn: false,
          });
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ saveId: state.saveId, isLoggedIn: state.isLoggedIn }), // Persist login state and saveId
      },
    ),
  ),
);
