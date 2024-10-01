import { TokenInfo } from '@/types/auth-types';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const getAccessToken = (req?: NextApiRequest, res?: NextApiResponse): string | undefined => {
  const accessToken = getCookie('accessToken', { req, res });
  return accessToken as string | undefined;
};

const setTokenInfo = (tokenInfo: TokenInfo, req?: NextApiRequest, res?: NextApiResponse) => {
  setCookie('accessToken', tokenInfo.accessToken, {
    req,
    res,
    maxAge: tokenInfo.accessTokenExpiresIn, // 1 week
    httpOnly: true, // Prevent access from JavaScript (improves security)
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    path: '/', // Make it accessible site-wide
  });
  setCookie('refreshToken', tokenInfo.refreshToken, {
    req,
    res,
    maxAge: tokenInfo.refreshTokenExpiresIn, // 1 week
    httpOnly: true, // Prevent access from JavaScript (improves security)
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    path: '/', // Make it accessible site-wide
  });
};

const deleteTokenInfo = (req?: NextApiRequest, res?: NextApiResponse) => {
  deleteCookie('accessToken', { req, res });
  deleteCookie('refreshToken', { req, res });
};

export { getAccessToken, setTokenInfo, deleteTokenInfo };
