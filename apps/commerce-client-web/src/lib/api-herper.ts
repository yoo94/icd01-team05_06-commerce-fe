// api-helper.ts
import { NextRequest } from 'next/server';
import { externalApi } from '@/lib/api';
import { TokenInfo } from '@/types/auth-types';

async function authenticatedApiRequest(
  request: NextRequest,
  endpoint: string,
  options: RequestInit = {},
) {
  try {
    // Step 1: Retrieve the access token from cookies
    let accessToken = request.cookies.get('accessToken')?.value;

    // Step 2: If no token, throw an error
    if (!accessToken) {
      throw new Error('No access token found in cookies');
    }

    // Step 3: Inject token into headers
    let headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Step 4: Make the request with the token injected
    let response = await externalApi(endpoint, {
      ...options,
      headers,
    });

    // Step 5: If access token expired, try to refresh it using the refresh token
    if (response.status === 401) {
      console.log('Access token expired, attempting to refresh');

      // Get refresh token from cookies
      const refreshToken = request.cookies.get('refreshToken')?.value;
      if (!refreshToken) {
        throw new Error('No refresh token found. User needs to log in again.');
      }

      // Request new tokens from the refresh endpoint
      const tokenResponse = await externalApi('auth/v1/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      // Step 6: Handle refresh token errors
      if (!tokenResponse.ok) {
        throw new Error('Refresh token expired or invalid. Please log in again.');
      }

      const newTokenInfo: TokenInfo = await tokenResponse.json();

      // Update headers with new access token
      accessToken = newTokenInfo.accessToken;
      headers = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      // Retry the original request with the new access token
      response = await externalApi(endpoint, {
        ...options,
        headers,
      });
    }

    // Step 7: Check if the request was successful
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Step 8: Return the data from the response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in authenticated API request:', error);
    throw error;
  }
}

export { authenticatedApiRequest };
