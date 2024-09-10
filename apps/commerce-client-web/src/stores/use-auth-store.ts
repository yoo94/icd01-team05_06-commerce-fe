import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware'; // persist 미들웨어 추가
import { useUserStore } from './use-user-store';
import { api } from '@/lib/api';
import { signIn, signOut } from 'next-auth/react';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// Zustand 스토어 정의
interface AuthStore {
  signupData: SignupFormData;
  loginData: LoginFormData;
  saveId: boolean;
  setSignupData: (data: Partial<SignupFormData>) => void;
  setLoginData: (data: Partial<LoginFormData>) => void;
  resetSignupData: () => void;
  resetLoginData: () => void;
  setSaveId: (save: boolean) => void;
  submitSignup: () => Promise<void>;
  submitLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
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
          address: '',
          addressDetail: '',
        },
        loginData: {
          email: '',
          password: '',
        },
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
              address: '',
              addressDetail: '',
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
        submitSignup: async () => {
          const { signupData, resetSignupData } = useAuthStore.getState();
          // 주소 정보 합치기
          // const fullAddress = `${signupData.address} ${signupData.addressDetail}`;
          // const submitData = { ...signupData, address: fullAddress };

          // TODO:서버에 필드추가해 달라고 요청하기
          const submitData = {
            email: signupData.email,
            password: signupData.password,
            name: signupData.name,
            phone: signupData.phone,
          };

          try {
            const response = await api.post('sign-up', {
              json: submitData,
            });

            // Check if the response is valid
            if (!response) {
              throw new Error('Failed to get a valid response from the server.');
            }

            useAuthStore.getState().setLoginData({
              email: signupData.email,
              password: signupData.password,
            });

            await useAuthStore.getState().submitLogin();

            resetSignupData();
          } catch (error) {
            resetSignupData();
            throw error;
          }
        },
        submitLogin: async () => {
          const { loginData, resetLoginData } = useAuthStore.getState();

          try {
            const response = await signIn('credentials', {
              email: loginData.email,
              password: loginData.password,
              redirect: false,
              callbackUrl: '/',
            });

            if (response?.error) {
              throw new Error(response.error);
            }

            // TODO: 로그인 성공하고 나면, 사용자 정보를 가져와서 저장
            // const user = await api.get('me').json<UserInfo>();
            // useUserStore.getState().setUserDetails(user);

            resetLoginData();
          } catch (error) {
            console.error('Error submitting login:', error);
            resetLoginData();
            throw error;
          }
        },
        logout: async () => {
          try {
            await signOut({ redirect: false, callbackUrl: '/' });

            useUserStore.getState().clearUserDetails();
          } catch (error) {
            console.error('Error during logout:', error);
            throw error;
          }
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useAuthStore;
