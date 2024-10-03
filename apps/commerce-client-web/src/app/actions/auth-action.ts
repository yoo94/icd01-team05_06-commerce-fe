'use server';

import { externalApi } from '@/lib/api';
import { LoginFormData, SignupFormData } from '@/stores/use-auth-store';
import { ApiResponse } from '@/types/api-types';
import { TokenInfo, TokenResponse, UserInfo } from '@/types/auth-types';
import { getHeadersWithToken } from './action-helper';
import { removeTokenInfo, setTokenInfo } from '@/lib/cookies';
// import { redirect } from 'next/navigation';

export const login = async (formData: LoginFormData) => {
  try {
    const response = await externalApi
      .post('auth/v1/login', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .json<TokenResponse>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }

    setTokenInfo(response.data.tokenInfo);

    // TODO: redirect 시, 발생하는 오류 해결하기
    // redirect('/');
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed');
  }
};

// TODO : 작동되는지 확인 여부 필요
export const signUp = async (formData: SignupFormData) => {
  try {
    const response = await externalApi
      .post('auth/v1/sign-up', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .json<TokenResponse>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'SignUp failed');
    }

    setTokenInfo(response.data.tokenInfo);
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error('Signup failed');
  }
};

export const logout = async () => {
  try {
    const headers = await getHeadersWithToken();

    if (!headers) {
      throw new Error('No token found');
    }

    const response = await externalApi
      .post('auth/v1/logout', {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Logout failed');
    }

    // Clear cookies on logout
    removeTokenInfo();

    // TODO: redirect 시, 발생하는 오류 해결하기
    // redirect('/');
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to logout');
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const headers = await getHeadersWithToken(); // Automatically refreshes token if expired

    if (!headers) {
      throw new Error('No token found');
    }

    const user = await externalApi
      .get('auth/v1/info', {
        headers,
      })
      .json<ApiResponse<UserInfo>>();

    console.log('User info:', user);

    if (!user.success || !user.data) {
      throw new Error(user.error?.message);
    }

    return user.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info');
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<TokenInfo> => {
  try {
    const response = await externalApi
      .post('auth/v1/refresh', {
        headers: {
          'Content-Type': 'application/json',
          'refresh-token': `Bearer ${refreshToken}`,
        },
      })
      .json<TokenResponse>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to refresh token');
    }

    return response.data.tokenInfo as TokenInfo; // Return new token info
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }
};
