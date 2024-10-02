import { externalApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { UserInfo } from '@/types/auth-types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    const result = await externalApi.get('auth/v1/info').json<ApiResponse<UserInfo>>();

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error?.message || 'Fetch user info failed' },
        { status: 400 },
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during fetch user info:', error);
    return NextResponse.json({ success: false, data: null, error }, { status: 500 });
  }
}
