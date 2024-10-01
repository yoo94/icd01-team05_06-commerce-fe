import { NextRequest, NextResponse } from 'next/server';
import { authenticatedApiRequest } from '@/lib/api-herper';

export async function POST(request: NextRequest) {
  try {
    const logoutResponse = await authenticatedApiRequest(request, 'auth/v1/logout');

    return NextResponse.json(logoutResponse, { status: 201 });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
