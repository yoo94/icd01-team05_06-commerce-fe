import NextAuth, { ExtendedUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginResponse } from '@/types/auth-types'; // Import the interfaces from auth.ts
import { api } from '@/lib/api';

type ApiError = {
  message: string;
  code?: number;
};

export const authOptions: NextAuthOptions = {
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
      async authorize(credentials, _req) {
        try {
          const result = await api
            .post('login', {
              json: credentials,
            })
            .json<{ success: boolean; data: LoginResponse; error: ApiError | null }>();

          if (!result.success || !result.data) {
            console.error('Login failed:', result.error?.message || 'Unknown error');
            throw new Error(result.error?.message || 'Failed to login');
          }

          const { memberInfo, tokenInfo } = result.data;

          // Check for access token
          if (!tokenInfo.accessToken) {
            console.error('No access token returned from the server');
            throw new Error('No access token returned from the server');
          }

          // TODO : 서버에서 expiresIn을 반환하지 않는 경우, 기본값으로 1시간 설정
          if (!tokenInfo.expiresIn) {
            tokenInfo.expiresIn = 60 * 60; // 1 hour
          }

          // Calculate expiresAt using expiresIn
          const expiredAt = Date.now() + tokenInfo.expiresIn * 1000; // Convert expiresIn to milliseconds

          // Return an ExtendedUser object
          const user = {
            id: memberInfo.id.toString(),
            name: memberInfo.name,
            email: memberInfo.email,
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
            expiredAt: expiredAt,
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
      // If the user is provided (first-time login), save the access and refresh tokens
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.accessToken = extendedUser.accessToken;
        token.refreshToken = extendedUser.refreshToken;
        token.expiredAt = extendedUser.expiredAt;
        token.error = undefined;

        return token;
      }

      if (typeof token.expiresAt === 'number' && Date.now() < token.expiresAt) {
        return token;
      }

      if (!token.refreshToken) {
        throw new TypeError('Missing refresh_token');
      }

      try {
        const refreshData = await api
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

        token.accessToken = accessToken;
        token.expiredAt = Date.now() + 60 * 60 * 1000; // 1 hour
        token.error = undefined;

        return token;
      } catch (error) {
        console.error('Error refreshing access token', error);
        token.error = 'RefreshTokenError'; // Correctly type the error
        return token;
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
