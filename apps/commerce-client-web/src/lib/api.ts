import ky, { HTTPError } from 'ky';
import { signOut, getSession } from 'next-auth/react';

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession();

        if (session?.accessToken) {
          request.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
    ],
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

export default api;
