import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define your NextAuth options
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
        const baseURL = process.env.NEXT_PUBLIC_API || '';

        // 1. 서버에서 CSRF 토큰 가져오기
        const csrfRes = await fetch(`${baseURL}/docs/auth-api-guide.html`, {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });

        if (!csrfRes.ok) {
          console.error('Failed to fetch CSRF token:', csrfRes.statusText);
          throw new Error('Failed to fetch CSRF token');
        }

        // 쿠키에서 CSRF 토큰 추출
        const setCookieHeader = csrfRes.headers.get('set-cookie');
        const cookies = setCookieHeader?.split(', ');

        let xsrfToken = null;
        for (const cookie of cookies || []) {
          if (cookie.startsWith('XSRF-TOKEN=')) {
            xsrfToken = cookie.split('=')[1].split(';')[0];
          }
        }

        console.log('XSRF-TOKEN:', xsrfToken);

        if (!xsrfToken) {
          console.error('Failed to retrieve XSRF token from cookies');
          throw new Error('Failed to retrieve XSRF token');
        }
        // 2. 요청에 CSRF 토큰 추가
        const headers = new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        });

        try {
          const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: headers,
          });

          if (!response.ok) {
            console.log(response);
            console.error('Failed to login:', response.statusText);
            throw new Error('Failed to login');
          }

          const user = await response.json(); // User 데이터를 JSON으로 파싱

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
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.id as string,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
