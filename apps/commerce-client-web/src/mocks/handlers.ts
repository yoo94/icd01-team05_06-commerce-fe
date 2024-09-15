import { http, HttpResponse } from 'msw';
import newReleases from '@/data/new-release.json';
import recommendedBooks from '@/data/recommended-books.json';
import bestSellers from '@/data/best-sellers.json';
import orders from '@/data/orders.json';

export const handlers = [
  http.get('http://localhost:3000/api/books/new-releases', () => {
    return HttpResponse.json(newReleases);
  }),

  http.get('http://localhost:3000/api/books/recommended', () => {
    return HttpResponse.json(recommendedBooks);
  }),

  http.get('http://localhost:3000/api/books/best-sellers', () => {
    return HttpResponse.json(bestSellers);
  }),

  http.get('https://example.com/orders', () => {
    return HttpResponse.json(orders);
  }),
];
