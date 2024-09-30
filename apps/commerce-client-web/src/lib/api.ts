import ky, { HTTPError } from 'ky';
import { getSession, signOut } from 'next-auth/react';
import { refreshAccessToken } from '@/utils/auth-utils';
import { cookies } from 'next/headers';

export const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API,
});

export const publicApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
});

export const privateApi = ky.create({
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          const token = cookies().get('jwt_token')?.value;

          console.log('JWT from cookies:', token);

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          } else {
            console.error('No JWT token found in cookies');
          }
        } catch (error) {
          console.error('Error setting access token:', error);
        }
      },
    ],
    beforeRetry: [
      async ({ request, error, retryCount }) => {
        const responseError = error as HTTPError;

        if (responseError.response?.status !== 401) return ky.stop; // Only retry on 401 Unauthorized

        if (retryCount >= 1) {
          console.error('Failed to refresh token, logging out.');
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }

        const session = await getSession();
        if (!session?.tokenInfo.refreshToken) {
          console.error('No refresh token available, logging out.');
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }

        try {
          const newTokens = await refreshAccessToken(session?.tokenInfo);

          // Update the session with the new access and refresh tokens
          await fetch('/api/auth/session', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            }),
          });

          // Set the new access token on the request
          request.headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
        } catch (error) {
          console.error('Error refreshing access token:', error);
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }
      },
    ],
  },
});

export const authApi = privateApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export const productApi = privateApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
});

export const orderApi = privateApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_ORDER_API_URL,
});
