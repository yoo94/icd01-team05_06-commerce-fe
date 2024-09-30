import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Sending request to external server...');

    // Retrieve JWT token from cookies
    const token = cookies().get('jwt_token')?.value;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_UR}/auth/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach JWT from cookies
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const user = await response.json();

    console.log('External server response:', user);

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}
