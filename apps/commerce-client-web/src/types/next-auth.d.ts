/* @see https://authjs.dev/getting-started/typescript#extend-default-interface-properties */
/**
 * name, email, image 외에 추가 속성을 정의
 */

import { DefaultUser } from 'next-auth';
import { UserInfo } from '@/types/auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserInfo; // Use the UserInfo interface for the user property
    accessToken: string;
    error?: 'RefreshTokenError';
  }

  interface ExtendedUser extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiredAt: number;
    error?: 'RefreshTokenError';
  }
}
