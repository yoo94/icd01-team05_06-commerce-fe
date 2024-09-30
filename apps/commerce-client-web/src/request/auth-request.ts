import { baseApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { UserInfo } from '@/types/auth-types';

export const getUserInfo = async () => {
  try {
    const user = await baseApi.get('user').json<ApiResponse<UserInfo>>();

    console.log('user:', user);

    if (!user.success) {
      throw new Error(user.error?.message);
    }

    return user.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw new Error('Failed to fetch user info');
  }
};
