// MemberInfo 타입 정의
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

// TokenInfo 타입 정의
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

// LoginResponse 타입 정의
export interface LoginResponse {
  memberInfo: User;
  tokenInfo: TokenInfo;
}
