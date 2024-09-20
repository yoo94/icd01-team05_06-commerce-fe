import { NextResponse } from 'next/server';
import books from '@/data/books.json';

const filterBooksByTag = (tag: string) => {
  return books.filter((book) => book.tags.includes(tag));
};

export async function GET() {
  const bestSellers = filterBooksByTag('베스트 셀러').slice(0, 10);
  return NextResponse.json(bestSellers);
}
