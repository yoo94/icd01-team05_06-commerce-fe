import ky from 'ky';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  credentials: 'include',
});
