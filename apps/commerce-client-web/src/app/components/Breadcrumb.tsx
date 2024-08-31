import React from 'react';
import Link from 'next/link';
import { BreadCrumbProps } from '@/types/breadCrumbTypes'; // 인터페이스를 가져오기

function Breadcrumb({ items }: BreadCrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <span key={index}>
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
          {index < items.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
