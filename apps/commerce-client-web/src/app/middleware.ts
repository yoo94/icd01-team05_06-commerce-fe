import { getAccessToken } from '@/lib/api-herper';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = getAccessToken(request);

  if (!token) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page', '/order', '/login'],
};
