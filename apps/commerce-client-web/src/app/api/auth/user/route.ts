import { NextRequest, NextResponse } from 'next/server';
import { authenticatedApiRequest } from '@/lib/api-herper';

export async function GET(request: NextRequest) {
  try {
    const userResponse = await authenticatedApiRequest(request, 'auth/v1/info');

    return NextResponse.json({ userResponse }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}
