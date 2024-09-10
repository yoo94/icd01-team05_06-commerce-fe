interface UserInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface LoginResponse {
  memberInfo: UserInfo;
  tokenInfo: TokenInfo;
}

export type { UserInfo, TokenInfo, LoginResponse };
