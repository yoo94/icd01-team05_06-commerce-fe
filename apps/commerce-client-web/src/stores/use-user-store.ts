import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserInfo } from '@/types/auth-types';

// 서버에서 가져온 정보 중 form에 필요한 값만 사용하기 위한 타입
export interface UserInfoFormValues {
  id: string;
  nickname: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

interface UserState {
  userInfo: UserInfo | null;
  userInfoFormValues: UserInfoFormValues;
  setUserInfo: (details: UserInfo) => void;
  setUserInfoFormValues: (values: UserInfoFormValues) => void;
  clearUserInfo: () => void;
  clearUserInfoFormValues: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      userInfoFormValues: {
        id: '',
        nickname: 'test_nickname',
        name: '',
        email: '',
        phone: '',
        gender: 'female',
        birthDate: '1990-01-01',
        postalCode: '06544',
        address: '서울특별시 서초구 신반포로 270 (반포동, 반포자이아파트)',
        addressDetail: '1111동 1234호',
      },

      setUserInfo: (details: UserInfo) => {
        set({ userInfo: details });
      },

      setUserInfoFormValues: (values: UserInfoFormValues) => set({ userInfoFormValues: values }),

      clearUserInfo: () => set({ userInfo: null }),

      clearUserInfoFormValues: () =>
        set({
          userInfoFormValues: {
            id: '',
            nickname: 'test_nickname',
            name: '',
            email: '',
            phone: '',
            gender: 'female',
            birthDate: '1990-01-01',
            postalCode: '06544',
            address: '서울특별시 서초구 신반포로 270 (반포동, 반포자이아파트)',
            addressDetail: 'test_detail',
          },
        }), // 폼 데이터 초기화
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userInfo: state.userInfo }), // Persist login state and saveId
    },
  ),
);

export const getFilteredUserInfo = (userInfo: UserInfoFormValues): UserInfo => {
  return {
    id: Number(userInfo.id),
    email: userInfo.email,
    phone: Number(userInfo.phone),
    name: userInfo.name,
  };
};
