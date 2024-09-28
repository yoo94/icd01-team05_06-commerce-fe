import { HttpResponse } from 'msw';
import { productClient } from '@/mocks/util/client';
import books from '@/data/books.json';
import orders from '@/data/orders.json';
import detailBooks from '@/data/detail-books.json';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import { withResponse } from '@/mocks/util/response';

type BookTag = '화제의 신간' | '추천 도서' | '베스트 셀러';

const filterBooksByTag = (tag: BookTag) => {
  return books.filter((book) => book.tags.includes(tag));
};

export const handlers = [
  productClient.get('books/new-releases', () => {
    const newReleases = filterBooksByTag('화제의 신간').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(newReleases);
  }),

  productClient.get('books/recommended', () => {
    const recommendedBooks = filterBooksByTag('추천 도서').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(recommendedBooks);
  }),

  productClient.get('books/best-sellers', () => {
    const bestSellers = filterBooksByTag('베스트 셀러').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(bestSellers);
  }),

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

  productClient.get('categories', () => {
    return HttpResponse.json(withResponse(categories));
  }),

  productClient.get('products', () => {
    return HttpResponse.json(withResponse(products));
  }),
];
