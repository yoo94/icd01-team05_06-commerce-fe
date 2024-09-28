import { NextResponse } from 'next/server';
import books from '@/data/detail-books.json';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const book = books.find((p) => p.id === Number(id));

  if (book) {
    return NextResponse.json(book);
  }

  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}
