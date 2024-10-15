import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { LoadingProvider } from '@/components/common/loading-context';
import LoadingSpinner from '@/components/common/loading-spinner'; // 로딩 스피너 임포트

export const metadata: Metadata = {
  title: '이너북스',
  description: '도서 이커머스',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <Header />
      <main className="max-w-screen-xs container justify-center p-4 sm:max-w-screen-md md:max-w-screen-lg md:p-8">
        {children}
      </main>
      <Footer />
      <div id="global-modal"></div>
      <Toaster />
      <LoadingSpinner />
    </LoadingProvider>
  );
}
