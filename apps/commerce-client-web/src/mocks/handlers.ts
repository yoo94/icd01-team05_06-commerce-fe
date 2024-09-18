import { http, HttpResponse } from 'msw';
import orders from '@/data/orders.json';
import books from '@/data/books.json';
import detailBooks from '@/data/detail-books.json';
import categories from '@/data/categories.json';

type BookTag = '화제의 신간' | '추천 도서' | '베스트 셀러';

const filterBooksByTag = (tag: BookTag) => {
  return books.filter((book) => book.tags.includes(tag));
};

const handlers = [
  http.get('http://localhost:3000/api/books/new-releases', () => {
    const newReleases = filterBooksByTag('화제의 신간').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(newReleases);
  }),

  http.get('http://localhost:3000/api/books/recommended', () => {
    const recommendedBooks = filterBooksByTag('추천 도서').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(recommendedBooks);
  }),

  http.get('http://localhost:3000/api/books/best-sellers', () => {
    const bestSellers = filterBooksByTag('베스트 셀러').slice(0, 10); // 처음 10개만 가져옴
    return HttpResponse.json(bestSellers);
  }),

  http.get('https://example.com/orders', () => {
    return HttpResponse.json(orders);
  }),

  http.get('http://localhost:3000/api/books', () => {
    return HttpResponse.json(books);
  }),

  http.get('http://localhost:3000/api/books/:id', (req) => {
    const { id } = req.params;

    const book = detailBooks.find((p) => p.id === Number(id));

    if (book) {
      return HttpResponse.json(book);
    }
    return HttpResponse.json({ error: 'Book not found' }, { status: 404 });
  }),

  http.get('http://localhost:3000/api/categories', () => {
    return HttpResponse.json(categories);
  }),
];

export { handlers };
