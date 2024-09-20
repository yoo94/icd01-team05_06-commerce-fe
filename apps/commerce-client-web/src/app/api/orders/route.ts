import { NextResponse } from 'next/server';
import orders from '@/data/orders.json';

export async function GET() {
  return NextResponse.json(orders);
}
