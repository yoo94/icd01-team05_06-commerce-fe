import 'server-only';
import { cookies } from 'next/headers';
import { TokenInfo } from '@/types/auth-types';

export const setTokenInfo = (tokenInfo: TokenInfo) => {
  const cookieStore = cookies();

  cookieStore.set('accessToken', tokenInfo.accessToken, {
    maxAge: tokenInfo.accessTokenExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  cookieStore.set('accessTokenExpiresIn', tokenInfo.accessTokenExpiresIn.toString(), {
    maxAge: tokenInfo.accessTokenExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  cookieStore.set('refreshToken', tokenInfo.refreshToken, {
    maxAge: tokenInfo.refreshTokenExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  cookieStore.set('refreshTokenExpiresIn', tokenInfo.refreshTokenExpiresIn.toString(), {
    maxAge: tokenInfo.refreshTokenExpiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
};

export const removeTokenInfo = () => {
  const cookieStore = cookies();

  cookieStore.set('accessToken', '', { maxAge: 0 });
  cookieStore.set('accessTokenExpiresIn', '', { maxAge: 0 });
  cookieStore.set('refreshToken', '', { maxAge: 0 });
  cookieStore.set('refreshTokenExpiresIn', '', { maxAge: 0 });
};
