// app/productList/layout.tsx

import React from 'react';
import Sidebar from '@/app/layout/components/sidebar';

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 p-4 border-r">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4">
        {children} {/* 페이지별 컨텐츠 */}
      </main>
    </div>
  );
}
