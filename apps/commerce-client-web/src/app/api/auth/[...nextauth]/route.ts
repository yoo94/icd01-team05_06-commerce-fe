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
        const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          // Fetch CSRF token
          const csrfRes = await fetch(`${baseURL}/docs/auth-api-guide.html`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are included
          });

          if (!csrfRes.ok) {
            console.error('Failed to fetch CSRF token:', csrfRes.statusText);
            return null; // Return null to indicate failed authorization
          }

          const setCookieHeader = csrfRes.headers.get('set-cookie');

          const cookies = setCookieHeader?.split(', ');

          let xsrfToken = null;

          for (const cookie of cookies || []) {
            if (cookie.startsWith('XSRF-TOKEN=')) {
              xsrfToken = cookie.split('=')[1].split(';')[0];
            }
          }

          console.log('XSRF Token:', xsrfToken);

          const headers = new Headers({
            Cookie: `XSRF-TOKEN=${xsrfToken};`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          });

          if (xsrfToken) {
            headers.append('X-XSRF-TOKEN', xsrfToken);
          }

          console.log('Headers for login request:', headers);

          const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
          };

          const res = await fetch(`${baseURL}/login`, options);
          console.log('Login response:', res);

          if (!res.ok) {
            console.error('Invalid credentials or failed response');
            return null;
          }

          const user = await res.json();
          console.log('User response:', user);

          if (!user) {
            console.error('No user data returned');
            return null;
          }

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
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // 보안을 위한 secret 키 설정
});

// Export the NextAuth handler as default
export { handler as GET, handler as POST };
