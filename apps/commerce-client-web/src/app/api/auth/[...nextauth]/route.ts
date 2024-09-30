import NextAuth, { ExtendedUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ApiError } from '@/types/api-types';
import { refreshAccessToken } from '@/utils/auth-utils';
import { TokenInfo, TokenResponse } from '@/types/auth-types';
import { publicApi } from '@/lib/api';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
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
          const result = await publicApi
            .post('auth/v1/login', {
              json: credentials,
            })
            .json<TokenResponse>();

          if (!result.success || !result.data) {
            console.error('Login failed:', result.error?.message || 'Unknown error');
            throw new Error(result.error?.message || 'Failed to login');
          }

          const { tokenInfo } = result.data;

          if (!tokenInfo.accessToken) {
            console.error('No access token returned from the server');
            throw new Error('No access token returned from the server');
          }

          console.log('External server accessToken', tokenInfo.accessToken);

          // Step 2: Fetch user information using the access token
          const userInfoResponse = await publicApi
            .get('auth/v1/info', {
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
            ...tokenInfo,
          };

          return user;
        } catch (error) {
          console.error('Error in authorization:', error);
          throw new Error('Failed to authenticate');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user as ExtendedUser) {
        const extendedUser = user as ExtendedUser;

        return {
          ...token,
          accessToken: extendedUser.accessToken,
          refreshToken: extendedUser.refreshToken,
          accessTokenExpiresIn: extendedUser.accessTokenExpiresIn,
          refreshTokenExpiresIn: extendedUser.refreshTokenExpiresIn,
          userId: extendedUser.id,
        };
      }

      if (Date.now() < token.accessTokenExpiresIn) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token as TokenInfo);

      return {
        ...refreshedToken,
        userId: token.userId,
      };
    },
    async session({ session, token }) {
      session.tokenInfo = {
        ...token,
      };
      session.error = token.error;
      session.user = {
        id: token.userId,
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
