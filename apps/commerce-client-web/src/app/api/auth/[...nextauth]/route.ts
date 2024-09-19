import NextAuth, { ExtendedUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginResponse, UserInfo } from '@/types/auth-types';
import ky from 'ky';
import { ApiError } from '@/types/api-types';

const apiClient = ky.create({
  prefixUrl: process.env.API_BASE_URL,
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
              data: UserInfo;
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
