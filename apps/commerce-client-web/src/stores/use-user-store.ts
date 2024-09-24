import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  userDetails: UserInfo | null;
  userInfoFormValues: UserInfoFormValues;
  setUserDetails: (details: UserInfo) => void;
  setUserInfoFormValues: (values: UserInfoFormValues) => void;
  clearUserDetails: () => void;
  clearUserInfoFormValues: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userDetails: null,
      userInfoFormValues: {
        id: '',
        nickname: 'test_nickname',
        name: 'test_name',
        email: '',
        phone: '010-1234-5678',
        gender: 'female',
        birthDate: '1990-01-01',
        postalCode: '06544',
        address: '서울특별시 서초구 신반포로 270 (반포동, 반포자이아파트)',
        addressDetail: '1111동 1234호',
      },

      setUserDetails: (details: UserInfo) => {
        set({ userDetails: details });
      },

      setUserInfoFormValues: (values: UserInfoFormValues) => set({ userInfoFormValues: values }),

      clearUserDetails: () => set({ userDetails: null }),

      clearUserInfoFormValues: () =>
        set({
          userInfoFormValues: {
            id: '',
            nickname: 'test_nickname',
            name: '',
            email: '',
            phone: '010-1234-5678',
            gender: 'female',
            birthDate: '1990-01-01',
            postalCode: '06544',
            address: '서울특별시 서초구 신반포로 270 (반포동, 반포자이아파트)',
            addressDetail: 'test_detail',
          },
        }), // 폼 데이터 초기화
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 기본적으로 로컬 스토리지를 사용
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
