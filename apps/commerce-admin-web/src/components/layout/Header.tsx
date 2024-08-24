'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function Header() {
  return (
    <nav className="w-full max-w-[250px]">
      <Card className="min-h-[550px] p-5">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/">대시보드</Link>
          </li>
          <li>
            <Link href="/users">사용자관리</Link>
          </li>
          <li>
            <Link href="">상품관리</Link>
          </li>
          <li>
            <Link href="">주문평관리</Link>
          </li>
          <li>
            <Link href="">주문관리</Link>
          </li>
        </ul>
      </Card>
    </nav>
  );
}
