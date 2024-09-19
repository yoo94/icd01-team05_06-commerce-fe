import NextAuth, { ExtendedUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import ky from 'ky';
import { LoginResponse } from '@/types/auth-types';
import { ApiError } from '@/types/api-types';

const apiClient = ky.create({
  prefixUrl: process.env.API_BASE_URL,
});

async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log('Now refreshing the expired token...');
  try {
    const res = await apiClient.post('refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.refreshToken}`, // Use refresh token in the request
      },
    });

    const { success, data } = await res.json();

    if (!success || !data.accessToken) {
      console.log('The token could not be refreshed!');
      throw new Error('Failed to refresh access token');
    }

    // Decode the new access token
    const decodedAccessToken = JSON.parse(
      Buffer.from(data.accessToken.split('.')[1], 'base64').toString(),
    );

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpiresIn: decodedAccessToken.exp * 1000, // New expiration time
      refreshToken: data.refreshToken ?? token.refreshToken, // Use new refreshToken if provided
      error: undefined,
    };
  } catch (error) {
    console.log('Error refreshing access token:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
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

          // console.log('External server accessToken', tokenInfo.accessToken);

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
          console.error('Error in authorization:', error);
          throw new Error('Failed to authenticate');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
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

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
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
