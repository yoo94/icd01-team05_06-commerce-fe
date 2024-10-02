import { externalApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  try {
    const result = await externalApi.post('auth/v1/logout').json<ApiResponse<null>>();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ success: false, data: null, error }, { status: 500 });
  }
}
