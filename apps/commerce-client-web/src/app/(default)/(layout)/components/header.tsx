'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderButton from './header-button';
import HeaderMenubar from './header-menubar';
import HamburgerMenu from './header-hamburgermenu';
import Search from './search';

const Header = () => {
  return (
    <header className="w-full border-b bg-background md:p-4">
      <div className="container mx-auto flex h-14 items-center justify-between md:h-fit">
        {/* 로고 */}
        <div className="shrink-0">
          <Link href="/" className="hidden md:flex">
            <Image
              src="/logo-lg.svg"
              alt="이너북스"
              width={180}
              height={60}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/" className="flex md:hidden">
            <Image
              src="/logo.svg"
              alt="이너북스"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* 검색 바 (모바일에서 숨김) */}
        <div className="mx-4 hidden max-w-xs grow md:flex md:max-w-md lg:max-w-lg">
          <Search />
        </div>

        {/* 버튼들 (데스크탑용) */}
        <div className="hidden items-center space-x-4 md:flex">
          <HeaderButton />
        </div>

        {/* 모바일용 햄버거 메뉴 */}
        <div className="flex md:hidden">
          <HamburgerMenu />
        </div>
      </div>

      {/* 메뉴바 (모바일에서 숨김) */}
      <div className="container mx-auto mt-4 hidden md:block">
        <HeaderMenubar />
      </div>
    </header>
  );
};

export default Header;
