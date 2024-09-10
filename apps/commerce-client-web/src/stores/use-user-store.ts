import { create } from 'zustand';
import { UserInfo } from '@/types/auth-types';

interface UserState {
  isAuthenticated: boolean;
  userDetails: UserInfo | null;
  setUserDetails: (details: UserInfo) => void;
  clearUserDetails: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userDetails: null,
  setUserDetails: (details) => set({ isAuthenticated: true, userDetails: details }),
  clearUserDetails: () => set({ isAuthenticated: false, userDetails: null }),
}));
