export async function fetcher(endpoint: string, options: RequestInit = {}) {
  // 1. 서버에서 CSRF 토큰 가져오기
  const csrfRes = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/docs/auth-api-guide.html`, {
    method: 'GET',
    credentials: 'include', // 쿠키 포함
  });

  if (!csrfRes.ok) {
    console.error('Failed to fetch CSRF token:', csrfRes.statusText);
    throw new Error('Failed to fetch CSRF token');
  }

  // 'Set-Cookie' 헤더에서 CSRF 토큰 추출
  const setCookieHeader = csrfRes.headers.get('set-cookie');
  const cookies = setCookieHeader?.split(', ');

  let xsrfToken = null;
  for (const cookie of cookies || []) {
    if (cookie.startsWith('XSRF-TOKEN=')) {
      xsrfToken = cookie.split('=')[1].split(';')[0];
    }
  }

  if (!xsrfToken) {
    console.error('Failed to retrieve XSRF token from cookies');
    throw new Error('Failed to retrieve XSRF token');
  }

  // 2. 요청에 CSRF 토큰 추가
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  // CSRF 토큰을 헤더에 추가
  if (xsrfToken) {
    headers.append('X-XSRF-TOKEN', xsrfToken);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...Object.fromEntries(headers.entries()), // Headers 객체를 일반 객체로 변환하여 사용
      ...(options.headers || {}),
    },
    credentials: 'include', // 항상 쿠키 포함
  };

  // 3. API 요청 보내기
  const response = await fetch(`/api${endpoint}`, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error in request to ${endpoint}: ${errorText}`);
  }

  return response.json();
}
