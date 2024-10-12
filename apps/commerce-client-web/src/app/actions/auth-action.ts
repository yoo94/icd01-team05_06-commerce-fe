'use server';

import { externalApi } from '@/lib/api';
import { LoginFormData, SignupFormData } from '@/stores/use-auth-store';
import { ApiResponse } from '@/types/api-types';
import { AuthToken, TokenInfo, TokenResponse, UserInfo } from '@/types/auth-types';
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

export const signUp = async (formData: SignupFormData) => {
  try {
    const response = await externalApi
      .post('auth/v1/sign-up', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'SignUp failed');
    }
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

    const response = await externalApi
      .get('auth/v1/info', {
        headers,
      })
      .json<ApiResponse<UserInfo>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message);
    }

    return response.data;
  } catch (error) {
    console.error('Failed to delete user account:', error);
    throw new Error('Failed to delete user account');
  }
};

export const updateUserInfo = async (
  userInfo: UserInfoFormData,
  authToken: string,
): Promise<boolean> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    // Create a shallow copy of the userInfo and filter out password if it's not provided
    const filteredUserInfo = { ...userInfo };

    if (!filteredUserInfo.password) {
      delete filteredUserInfo.password;
    }

    const response = await externalApi
      .put('auth/v1/update', {
        body: JSON.stringify(filteredUserInfo), // Send filtered userInfo
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
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

export const verifyPassword = async (password: string): Promise<AuthToken> => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await externalApi
      .post('auth/v1/password-verify', {
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      })
      .json<ApiResponse<AuthToken>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to verify password');
    }

    return response.data;
  } catch (error) {
    console.error('Password verification error:', error);
    throw new Error('Failed to verify password');
  }
};

export const deleteUserAccount = async () => {
  const headers = await getHeadersWithToken();

  try {
    if (!headers) {
      throw new Error('No token found');
    }

    const response = await externalApi
      .delete('auth/v1/withdrawal', {
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to delete user account');
    }

    removeTokenInfo();

    redirect('/');
  } catch (error) {
    console.error('Failed to delete user account:', error);
    throw new Error('Failed to delete user account');
  }
};
