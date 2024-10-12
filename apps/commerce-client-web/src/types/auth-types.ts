import { ApiResponse } from './api-types';

export interface TokenInfo {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
  detailAddress: string;
}

export interface UserSession {
  id: number;
  name: string;
  email: string;
}

export interface AuthToken {
  token: string;
}

// Reuse for both login and refresh responses
export type TokenResponse = ApiResponse<{ tokenInfo: TokenInfo }>;
