import { http, HttpResponse } from 'msw';
import orders from '@/data/orders.json';

export const handlers = [
  http.get('https://example.com/orders', () => {
    return HttpResponse.json(orders);
  }),
];
