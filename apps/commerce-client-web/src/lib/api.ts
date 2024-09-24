import ky, { HTTPError } from 'ky';
import { getSession, signOut } from 'next-auth/react';

export const baseApi = ky.create({
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    // getSession()을 호출하면 NEXTAUTH_URL/api/auth/session으로 요청을 보냄
    // 빌드 단계에서는 이 요청이 무조건 실패하기 때문에 에러 발생
    // 토큰을 넣어주는 다른 방식을 생각해봐야 할 듯
    // beforeRequest: [
    //   async (request) => {
    //     const session = await getSession();
    //
    //     if (session?.accessToken) {
    //       request.headers.set('Authorization', `Bearer ${session.accessToken}`);
    //     }
    //   },
    // ],
    beforeRetry: [
      async ({ request, error, retryCount }) => {
        const responseError = error as HTTPError; // Cast error to ky.HTTPError to access response

        if (responseError.response?.status !== 401) return ky.stop; // Only handle 401 errors

        if (retryCount >= 1) {
          console.error('Failed to refresh token, logging out.');
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }

        const session = await getSession();
        if (!session?.refreshToken) {
          console.error('No refresh token available, logging out.');
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }

        try {
          const refreshResponse = await fetch(`${process.env.API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!refreshResponse.ok) {
            throw new Error('Failed to refresh token');
          }

          const newTokens = await refreshResponse.json();

          // Update tokens in next-auth session
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

          request.headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          await signOut({ callbackUrl: '/' });
          return ky.stop;
        }
      },
    ],
  },
});

export const authApi = baseApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export const productApi = baseApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
});

export const orderApi = baseApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_ORDER_API_URL,
});
