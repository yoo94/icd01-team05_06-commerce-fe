import { NextRequest, NextResponse } from 'next/server';
import { externalApi } from '@/lib/api';
import { TokenInfo, TokenResponse } from '@/types/auth-types';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse request body in NextRequest
    const { email, password } = body;

    // Step 1: Sign up the user with the external API
    const result = await externalApi
      .post('auth/v1/login', {
        json: { email, password },
      })
      .json<TokenResponse>();

    if (!result.success || !result.data) {
      return NextResponse.json({ error: result.error?.message || 'Login failed' }, { status: 400 });
    }

    const tokenInfo: TokenInfo = result.data.tokenInfo;

    // Step 2: Set cookies for JWT and refresh token after successful login
    const cookieStore = cookies();

    // Set accessToken
    cookieStore.set('accessToken', tokenInfo.accessToken, {
      maxAge: tokenInfo.accessTokenExpiresIn, // Token expiry time
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    // Set refreshToken
    cookieStore.set('refreshToken', tokenInfo.refreshToken, {
      maxAge: tokenInfo.refreshTokenExpiresIn, // Token expiry time
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
