import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const HeaderButton = () => {
  const isLogin = false; // 현재는 로그인 상태를 false로 설정
  return (
    <>
      <Link href={'/cart'}>
        <ShoppingCart />
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
