import { HttpResponse } from 'msw';
import { productClient } from '@/mocks/util/client';
import books from '@/data/books.json';
import orders from '@/data/orders.json';
import detailBooks from '@/data/detail-books.json';
import categories from '@/data/categories.json';
import productsResponse from '@/data/products.json';
import { withResponse } from '@/mocks/util/response';
import { Product } from '@/types/product-types';

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

  productClient.get('products', (req) => {
    const paramsString = req.request.url.split('?')[1];
    const searchParams = new URLSearchParams(paramsString);
    const queryParamsObject = Object.fromEntries(searchParams.entries());

    const filteredProducts = filterProducts(productsResponse.products, queryParamsObject);
    const page = parseInt(queryParamsObject.page || '1', 10);
    const size = parseInt(queryParamsObject.size || '5', 10);
    const data = paginate(filteredProducts, page, size);
    return HttpResponse.json({ data });
  }),
];

const filterProducts = (products: Product[], queryParams: Record<string, string>) => {
  return products.filter((product) => {
    if (queryParams.price) {
      const [minPrice, maxPrice] = queryParams.price.split('-').map((price) => Number(price));
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    if (queryParams.publisher) {
      const publishers = queryParams.publisher.split(',').map((publisher) => publisher.trim());
      if (!publishers.includes(product.publisher)) {
        return false;
      }
    }
    return true;
  });
};

const paginate = (filteredProducts: Product[], page: number, size: number) => {
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / size);
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    pagination: {
      page,
      pageSize: size,
      totalItems,
      totalPages,
    },
  };
};
