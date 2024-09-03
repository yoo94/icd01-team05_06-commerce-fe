import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // Redux DevTools를 위한 devtools 미들웨어 가져오기
import { signIn } from 'next-auth/react'; // next-auth의 signIn 함수 가져오기
import { fetcher } from '@/lib/fetcher';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  setSignupData: (data: Partial<SignupFormData>) => void;
  setLoginData: (data: Partial<LoginFormData>) => void;
  resetSignupData: () => void;
  resetLoginData: () => void;
  submitSignup: () => Promise<void>;
  submitLogin: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    signupData: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    submitSignup: async () => {
      const { signupData, resetSignupData } = useAuthStore.getState();
      const fullAddress = `${signupData.address} ${signupData.addressDetail}`;
      const submitData = { ...signupData, address: fullAddress };

      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit signup');
        }

        const data = await response.json();
        console.log('Signup submitted successfully:', data);

        const loginResult = await signIn('credentials', {
          redirect: false,
          email: signupData.email,
          password: signupData.password,
        });

        if (loginResult?.error) {
          throw new Error('Login after signup failed');
        }

        console.log('User logged in successfully after signup');
      } catch (error) {
        console.error('Error during signup:', error);
        resetSignupData();
      }
    },
    submitLogin: async () => {
      const { loginData, resetLoginData } = useAuthStore.getState();

      try {
        const response = await fetcher('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response) {
          throw new Error('Failed to get a valid response from the server.');
        }

        // 받은 토큰 저장
        localStorage.setItem('accessToken', response.tokenInfo.accessToken);
        localStorage.setItem('refreshToken', response.tokenInfo.refreshToken);
      } catch (error) {
        console.error('Error submitting login:', error);
        resetLoginData();
        throw error;
      }
    },
  })),
);

export default useAuthStore;
