/* @see https://authjs.dev/getting-started/typescript#extend-default-interface-properties */
/**
 * name, email, image 외에 추가 속성을 정의
 */

import { DefaultUser } from 'next-auth';
import { UserInfo } from '@/types/auth';
import { TokenInfo } from './auth-types';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserInfo; // Use the UserInfo interface for the user property
    tokenInfo: TokenInfo;
    error?: string;
  }

  interface ExtendedUser extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    userId: string;
    error?: string;
  }
}
