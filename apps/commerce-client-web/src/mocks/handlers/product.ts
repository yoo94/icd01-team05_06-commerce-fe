import { HttpResponse } from 'msw';
import { productClient } from '@/mocks/util/client';
import books from '@/data/books.json';
import orders from '@/data/orders.json';
import detailBooks from '@/data/detail-books.json';
import categories from '@/data/categories.json';
import productsResponse from '@/data/products.json';
import { withResponse } from '@/mocks/util/response';
import { Product } from '@/types/product-types';

export const handlers = [
  productClient.get('books', () => {
    return HttpResponse.json(books);
  }),

  productClient.get(`orders`, () => {
    return HttpResponse.json(orders);
  }),

  productClient.get('books/:id', (req) => {
    const { id } = req.params;

    const book = detailBooks.find((p) => p.id === Number(id));

    if (book) {
      return HttpResponse.json(book);
    }
    return HttpResponse.json({ error: 'Book not found' }, { status: 404 });
  }),
];
