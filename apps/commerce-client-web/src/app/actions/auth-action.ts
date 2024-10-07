'use server';

import { externalApi } from '@/lib/api';
import { LoginFormData, SignupFormData } from '@/stores/use-auth-store';
import { ApiResponse } from '@/types/api-types';
import { TokenInfo, TokenResponse, UserInfo } from '@/types/auth-types';
import { getHeadersWithToken } from './action-helper';
import { removeTokenInfo, setTokenInfo } from '@/lib/cookies';
import { redirect } from 'next/navigation';
import { UserInfoFormData } from '@/stores/use-user-store';

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

    redirect('/');
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      return;
    }
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
  const headers = await getHeadersWithToken();

  try {
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

    redirect('/');
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      return;
    }
    console.error('Error during logout:', error);
    throw new Error('Failed to logout');
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const user = await externalApi
      .get('auth/v1/info', {
        headers,
      })
      .json<ApiResponse<UserInfo>>();

    if (!user.success || !user.data) {
      throw new Error(user.error?.message);
    }

    return user.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info');
  }
};

export const updateUserInfo = async (userInfo: UserInfoFormData): Promise<boolean> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await externalApi
      .put('auth/v1/update', {
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to update user info');
    }

    return response.success;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw new Error('Failed to update user info');
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
      throw new Error(response.error?.message || 'Failed to refresh access token');
    }

    return response.data.tokenInfo;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    removeTokenInfo();
    redirect('/');
  }
};
