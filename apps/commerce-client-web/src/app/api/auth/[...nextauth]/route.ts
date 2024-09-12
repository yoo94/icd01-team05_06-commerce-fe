import NextAuth, { ExtendedUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginResponse } from '@/types/auth-types';
import ky from 'ky';

type ApiError = {
  message: string;
  code?: number;
};

const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API, // Use your API URL here
});

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verify=1',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Step 1: Authenticate and retrieve JWT tokens
          const result = await apiClient
            .post('login', {
              json: credentials,
            })
            .json<{ success: boolean; data: LoginResponse; error: ApiError | null }>();

          if (!result.success || !result.data) {
            console.error('Login failed:', result.error?.message || 'Unknown error');
            throw new Error(result.error?.message || 'Failed to login');
          }

          const { tokenInfo } = result.data;

          if (!tokenInfo.accessToken) {
            console.error('No access token returned from the server');
            throw new Error('No access token returned from the server');
          }

          const currentTime = Date.now();
          const accessTokenExpiresIn =
            tokenInfo.accessTokenExpiresIn - currentTime > 0
              ? tokenInfo.accessTokenExpiresIn - currentTime
              : 0;
          const refreshTokenExpiresIn =
            tokenInfo.refreshTokenExpiresIn - currentTime > 0
              ? tokenInfo.refreshTokenExpiresIn - currentTime
              : 0;

          // Step 2: Fetch user information using the access token
          const userInfoResponse = await apiClient
            .get('info', {
              headers: {
                Authorization: `Bearer ${tokenInfo.accessToken}`,
              },
            })
            .json<{
              success: boolean;
              data: { id: number; name: string; email: string };
              error: ApiError | null;
            }>();

          if (!userInfoResponse.success || !userInfoResponse.data) {
            console.error(
              'Failed to fetch user information:',
              userInfoResponse.error?.message || 'Unknown error',
            );
            throw new Error(userInfoResponse.error?.message || 'Failed to fetch user information');
          }

          const { id, name, email } = userInfoResponse.data;

          const user: ExtendedUser = {
            id: id.toString(),
            name,
            email,
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
            accessTokenExpiresIn,
            refreshTokenExpiresIn,
          };

          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;

        return {
          ...token,
          ...extendedUser,
          error: undefined,
        };
      }

      if (
        typeof token.accessTokenExpiresIn === 'number' &&
        Date.now() < token.accessTokenExpiresIn
      ) {
        return token;
      }

      if (!token.refreshToken) {
        throw new TypeError('Missing refresh_token');
      }

      try {
        const refreshData = await apiClient
          .post('refresh', {
            json: { refreshToken: token.refreshToken },
          })
          .json<{ success: boolean; data: { accessToken: string }; error: ApiError | null }>();

        if (!refreshData.success || !refreshData.data.accessToken) {
          console.error(
            'Error refreshing access token:',
            refreshData.error?.message || 'Unknown error',
          );
          throw new Error(refreshData.error?.message || 'Failed to refresh access token');
        }

        const { accessToken } = refreshData.data;

        return {
          ...token,
          accessToken,
          accessTokenExpiresIn: Date.now() + 60 * 60 * 1000,
          error: undefined,
        };
      } catch (error) {
        console.error('Error refreshing access token', error);
        return {
          ...token,
          error: 'RefreshTokenError',
        };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
