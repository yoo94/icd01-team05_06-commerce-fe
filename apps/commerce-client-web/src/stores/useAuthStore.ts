import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware'; // persist 미들웨어 추가
import { fetcher } from '@/lib/fetcher';
import { useUserStore } from './useUserStore';
// import { signIn } from 'next-auth/react';

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
  isAuthenticated: boolean;
  signupData: SignupFormData;
  loginData: LoginFormData;
  accessToken: string | null;
  refreshToken: string | null;
  setSignupData: (data: Partial<SignupFormData>) => void;
  setLoginData: (data: Partial<LoginFormData>) => void;
  resetSignupData: () => void;
  resetLoginData: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  submitSignup: () => Promise<void>;
  submitLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
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
        accessToken: null,
        refreshToken: null,
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
          set({
            loginData: {
              email: '',
              password: '',
            },
          }),
        setTokens: (accessToken, refreshToken) =>
          set({
            accessToken,
            refreshToken,
          }),
        clearTokens: () =>
          set({
            accessToken: null,
            refreshToken: null,
          }),
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
            const response = await fetcher('/sign-up', {
              method: 'POST',
              body: JSON.stringify(submitData),
            });

            if (!response.ok) {
              throw new Error('Failed to submit signup');
            }

            useAuthStore.getState().setLoginData({
              email: signupData.email,
              password: signupData.password,
            });

            await useAuthStore.getState().submitLogin();
          } catch (error) {
            console.error('Error during signup:', error);
            resetSignupData();
          }
        },
        submitLogin: async () => {
          const { loginData, resetLoginData, setTokens } = useAuthStore.getState();

          try {
            const userData = await fetcher('/login', {
              method: 'POST',
              body: JSON.stringify(loginData),
            });

            // TODO: next-auth로 로그인 처리
            // const userData = await signIn('credentials', {
            //   email: loginData.email,
            //   password: loginData.password,
            // });

            if (!userData) {
              throw new Error('Failed to get a valid userData from the server.');
            }

            set({ isAuthenticated: true });

            // User Store에 사용자 정보 저장
            useUserStore.getState().setUserDetails(userData.memberInfo);

            // 받은 토큰 저장
            setTokens(userData.tokenInfo.accessToken, userData.tokenInfo.refreshToken);
          } catch (error) {
            console.error('Error submitting login:', error);
            resetLoginData();
            useAuthStore.getState().clearTokens(); // 로그인 실패 시 토큰 초기화
            throw error;
          }
        },
        logout: async () => {
          const { clearTokens } = useAuthStore.getState();

          try {
            await fetcher('/logout', {
              method: 'POST',
            });

            clearTokens();
            useUserStore.getState().clearUserDetails();
            set({ isAuthenticated: false });
          } catch (error) {
            console.error('Error during logout:', error);
            throw error;
          }
        },
      }),
      {
        name: 'auth-storage', // 로컬 스토리지에 저장될 key 이름
        storage: createJSONStorage(() => localStorage), // JSON 저장소로 localStorage 설정
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          signupData: state.signupData,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }), // 저장할 상태만 선택
      },
    ),
  ),
);

export default useAuthStore;
