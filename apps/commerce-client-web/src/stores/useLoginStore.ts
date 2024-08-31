import create from 'zustand';

interface LoginState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  login: () => {
    // 여기에 로그인 로직을 구현하세요.
    alert('로그인 시도 중...');
  },
}));
