'use server';

import ky from 'ky';

export const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  credentials: 'include',
});

export const externalApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  timeout: 10000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  credentials: 'include',
});

export const authApi = externalApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export const productApi = externalApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
});

export const orderApi = externalApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_ORDER_API_URL,
});
