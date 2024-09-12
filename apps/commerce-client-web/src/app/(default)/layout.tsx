import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import React from 'react';

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
    <>
      <Header />
      <main className="container justify-center p-4 md:p-8">{children}</main>
      <Footer />
    </>
  );
}
