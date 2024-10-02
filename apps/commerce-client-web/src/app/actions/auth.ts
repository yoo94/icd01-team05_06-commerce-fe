'use server';

import { baseApi } from '@/lib/api';
import { LoginFormData } from '@/stores/use-auth-store';
import { ApiResponse } from '@/types/api-types';
import { TokenResponse, UserInfo } from '@/types/auth-types';
import { cookies } from 'next/headers';

// 로그인 액션 함수
export const login = async (formData: LoginFormData) => {
  const { email, password } = formData;

  // API 요청으로 로그인 시도
  await baseApi
    .post('api/auth/login', {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .json<TokenResponse>()
    .then((response) => {
      // 쿠키에 accessToken 저장
      cookies().set('accessToken', response.data.tokenInfo.accessToken, {
        maxAge: response.data.tokenInfo.accessTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      cookies().set('refreshToken', response.data.tokenInfo.refreshToken, {
        maxAge: response.data.tokenInfo.refreshTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    })
    .catch((error) => {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    });
};

export const logout = async () => {
  try {
    const response = await baseApi.post('api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    cookies().set('accessToken', '', { maxAge: 0 });
    cookies().set('refreshToken', '', { maxAge: 0 });

    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to logout');
  }
};

export const getUserInfo = async () => {
  try {
    const user = await baseApi.get('api/auth/user').json<ApiResponse<UserInfo>>();

    console.log('User info:', user);

    if (!user.success) {
      throw new Error(user.error?.message);
    }

    return user.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info');
  }
};
