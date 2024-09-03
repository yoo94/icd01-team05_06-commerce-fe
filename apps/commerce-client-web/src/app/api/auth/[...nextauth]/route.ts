import { fetcher } from '@/lib/fetcher';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define your NextAuth options
const handler = NextAuth({
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
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          // fetcher를 사용하여 로그인 요청
          const user = await fetcher('/login', {
            method: 'POST',
            body: JSON.stringify(data),
          });

          console.log('Successfully authenticated user:', user.memberInfo);

          return user.memberInfo;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', token, user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // 클라이언트 세션에 사용자 정보만 포함
      session.user = {
        email: token.email as string,
        name: token.name as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
