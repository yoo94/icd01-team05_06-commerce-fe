import ky, { HTTPError } from 'ky';
import { signOut, getSession } from 'next-auth/react';
import { refreshAccessToken } from '@/utils/auth-utils';

const api = ky.create({
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession();

        if (session?.tokenInfo.accessToken) {
          request.headers.set('Authorization', `Bearer ${session?.tokenInfo.accessToken}`);
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

export default api;
