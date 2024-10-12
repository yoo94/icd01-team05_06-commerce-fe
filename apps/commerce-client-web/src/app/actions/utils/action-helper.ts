'use server';

import { cookies } from 'next/headers';
import { refreshAccessToken } from '@/app/actions/auth-action';
import { setTokenInfo } from '@/lib/cookies';

const isTokenExpired = (expiresIn: number): boolean => {
  return Date.now() > expiresIn;
};

export const getHeadersWithToken = async (): Promise<Record<string, string> | null> => {
  let jwtToken = cookies().get('accessToken')?.value;

  if (jwtToken === undefined) {
    return null;
  } else {
    const accessTokenExpiresIn = parseInt(cookies().get('accessTokenExpiresIn')?.value || '0', 10);
    const refreshToken = cookies().get('refreshToken')?.value;

    if (isTokenExpired(accessTokenExpiresIn)) {
      if (refreshToken) {
        const newTokenInfo = await refreshAccessToken(refreshToken);
        jwtToken = newTokenInfo.accessToken; // Update with new token

        setTokenInfo(newTokenInfo);
      }
    }

    return {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    };
  }
};
