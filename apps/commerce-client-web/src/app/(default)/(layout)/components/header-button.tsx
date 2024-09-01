import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeaderButton: React.FC = () => {
  const isLogin = false; // 현재는 로그인 상태를 false로 설정
  return (
    <>
      <Link href={'/cart'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </Link>
      {isLogin ? (
        <>
          <Button asChild>
            <Link href={'/logout'}>로그아웃</Link>
          </Button>
          <Button asChild>
            <Link href={'/myPage'}>마이페이지</Link>
          </Button>
          <Button asChild>
            <Link href={'/myPage'}>장바구니</Link>
          </Button>
        </>
      ) : (
        <Button asChild>
          <Link href={'/login'}>로그인</Link>
        </Button>
      )}
    </>
  );
};

export default HeaderButton;
