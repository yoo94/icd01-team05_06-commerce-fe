import { HttpResponse } from 'msw';
import { orderClient } from '@/mocks/util/client';
import orders from '@/data/orders.json';

export const handlers = [
  orderClient.get('https://example.com/orders', () => {
    return HttpResponse.json(orders);
  }),
];
