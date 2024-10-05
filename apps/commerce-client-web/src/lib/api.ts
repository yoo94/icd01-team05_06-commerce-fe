import ky from 'ky';

export const externalApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  credentials: 'include',
});

export const productApi = externalApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
});

export const orderApi = externalApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_ORDER_API_URL,
});
