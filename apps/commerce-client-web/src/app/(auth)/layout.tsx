import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // Link 컴포넌트 가져오기

export const metadata: Metadata = {
  title: '이너북스',
  description: '도서 이커머스',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-start justify-center p-4 xs:p-6 md:p-8 lg:p-12 xl:p-[100px]">
      <section className="w-full max-w-md bg-white p-4 xs:p-6">
        <div className="mb-6 flex items-center justify-center xs:mb-8 sm:mb-10">
          <Link href="/" passHref>
            {' '}
            {/* 홈 경로로 이동하는 링크 */}
            <Image
              src="/logo-wide.svg"
              alt="Logo"
              width={200}
              height={50}
              className="w-40 cursor-pointer xs:w-48 sm:w-52 md:w-60 lg:w-64 xl:w-[200px]"
              priority
            />
          </Link>
        </div>
        {children}
      </section>
    </main>
  );
}
