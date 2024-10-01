import { NextRequest, NextResponse } from 'next/server';
import { externalApi } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, password, name, phone } = await req.json();

    // Step 1: Sign up the user with the external API
    const result = await externalApi
      .post('auth/v1/sign-up', {
        json: { email, password, name, phone },
      })
      .json<ApiResponse<null>>();

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error?.message || 'Signup failed' },
        { status: 400 },
      );
    }

    // Respond with a success message
    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);

    // Return a 500 internal server error in case of an exception
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
