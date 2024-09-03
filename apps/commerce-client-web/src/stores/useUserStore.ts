import { create } from 'zustand';
import { User } from '@/types/auth';

interface UserState {
  isAuthenticated: boolean;
  userDetails: User | null;
  setUserDetails: (details: User) => void;
  clearUserDetails: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userDetails: null,
  setUserDetails: (details) => set({ isAuthenticated: true, userDetails: details }),
  clearUserDetails: () => set({ isAuthenticated: false, userDetails: null }),
}));
