'use server';

import { baseApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { TokenInfo, TokenResponse, UserInfo } from '@/types/auth-types';

// Login Function
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await baseApi
      .post('api/auth/login', {
        body: JSON.stringify({ email, password }),
      })
      .json<TokenResponse>();

    console.log('Handle Login result:', response);

    if (!response.success) {
      throw new Error(response.error?.message || 'Login failed');
    }

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed');
  }
};

// Fetch user info
const getUserInfo = async () => {
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

// Signup Function
const handleSignup = async (signupData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await baseApi
      .post('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })
      .json<ApiResponse<{ tokenInfo: TokenInfo }>>();

    const data = response.data;

    console.log('Signup successful:', data);

    return data.tokenInfo; // Return tokenInfo for login or further actions
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error('Signup failed');
  }
};

// Logout Function
const handleLogout = async () => {
  try {
    const response = await baseApi.post('api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to logout');
  }
};

export { handleLogin, handleSignup, handleLogout, getUserInfo };
