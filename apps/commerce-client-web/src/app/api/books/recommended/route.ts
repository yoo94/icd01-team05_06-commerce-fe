import { NextResponse } from 'next/server';
import books from '@/data/books.json';

const filterBooksByTag = (tag: string) => {
  return books.filter((book) => book.tags.includes(tag));
};

export async function GET() {
  const recommendedBooks = filterBooksByTag('추천 도서').slice(0, 10);
  return NextResponse.json(recommendedBooks);
}
