interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

interface LoginResponse {
  tokenInfo: TokenInfo;
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
  phone: number;
}

export type { TokenInfo, LoginResponse, UserInfo };
