import { NextResponse } from 'next/server';
import books from '@/data/books.json';

const filterBooksByTag = (tag: string) => {
  return books.filter((book) => book.tags.includes(tag));
};

export async function GET() {
  const newReleases = filterBooksByTag('화제의 신간').slice(0, 10);
  return NextResponse.json(newReleases);
}
