// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// 로그인하지 않은 사용자가 접근할 수 없는 보호된 경로 목록
const protectedRoutes = ['/mypage', '/order'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value; // accessToken이 쿠키에 있는지 확인

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    // 보호된 경로에 접근하려는 경우 + 토큰이 없는 경우 로그인 페이지로 리디렉션
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 보호된 경로가 아니거나 토큰이 있는 경우 요청을 그대로 전달
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 설정
export const config = {
  matcher: ['/mypage/:path*', '/order/:path*'],
};
