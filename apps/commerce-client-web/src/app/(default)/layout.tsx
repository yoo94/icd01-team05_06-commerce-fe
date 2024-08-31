import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/app/(default)/(layout)/components/header';
import Footer from '@/app/(default)/(layout)/components/footer';
import React from 'react';

export const metadata: Metadata = {
  title: 'inner books',
  description: '도서 이커머스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container justify-center p-4 xs:p-6 md:p-8 lg:p-12 xl:p-[100px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
