import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '이너북스',
  description: '도서 이커머스',
  icons: {
    icon: '/favicon.ico',
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="xs:p-6 flex items-start justify-center p-4 md:p-8 lg:p-12 xl:p-[100px]">
      <section className="xs:p-6 w-full max-w-md bg-white p-4">
        <div className="xs:mb-8 mb-6 flex items-center justify-center sm:mb-10">
          <Image
            src="/logo-wide.svg"
            alt="Logo"
            width={200}
            height={50}
            className="xs:w-48 w-40 sm:w-52 md:w-60 lg:w-64 xl:w-[200px]"
          />
        </div>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
