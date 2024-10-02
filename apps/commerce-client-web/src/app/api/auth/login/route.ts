import { NextRequest, NextResponse } from 'next/server';
import { externalApi } from '@/lib/api';
import { TokenResponse } from '@/types/auth-types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Parse request body in NextRequest
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

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ success: false, data: null, error }, { status: 500 });
  }
}
