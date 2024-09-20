import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import HeaderButton from './header-button';
import HeaderMenubar from './header-menubar';
import HamburgerMenu from './header-hamburgermenu';
import TopBar from './top-bar';
import SearchBar from './search-bar';

import { transformServerCategories } from '@/lib/utils';
import { MainMenu, MenuCategory } from '@/types/menu-types';
import { Category } from '@/types/category-types';
import api from '@/lib/api';

const Header = async () => {
  const serverData = await api.get('api/categories').json<Category[]>();

  const categories: MenuCategory[] = transformServerCategories(serverData);

  const mainMenu: MainMenu[] = [
    {
      title: '전체 카테고리',
      categories: categories,
    },
    {
      title: '베스트 셀러',
    },
    {
      title: '화제의 신간',
    },
    {
      title: '추천 도서',
    },
  ];

  return (
    <header className="w-full border-b bg-background">
      {/* 상단 고정 헤더 */}
      <TopBar />
      {/* 메인 헤더 */}
      <div className="container mx-auto flex h-14 max-w-screen-xs items-center justify-between p-4 sm:max-w-screen-md md:h-fit md:max-w-screen-lg">
        {/* 로고 */}
        <div className="shrink-0">
          <Link href="/" className="hidden md:flex">
            <Image
              src="/images/svg/logo-lg.svg"
              alt="이너북스"
              width={180}
              height={60}
              className="cursor-pointer"
              priority
            />
          </Link>
          <Link href="/" className="flex md:hidden">
            <Image
              src="/images/svg/logo.svg"
              alt="이너북스"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* 검색 바 (모바일에서 숨김) */}
        <div className="mx-4 hidden w-full flex-1 md:flex">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        {/* 버튼들 (데스크탑용) */}
        <div className="hidden items-center space-x-4 md:flex">
          <HeaderButton />
        </div>

        {/* 모바일용 햄버거 메뉴 */}
        <div className="flex md:hidden">
          <HamburgerMenu mainMenu={mainMenu} />
        </div>
      </div>

      {/* 메뉴바 (모바일에서 숨김) */}
      <div className="container mx-auto mt-4 hidden max-w-screen-xs sm:max-w-screen-md md:block md:h-fit md:max-w-screen-lg">
        <HeaderMenubar mainMenu={mainMenu} />
      </div>
    </header>
  );
};

export default Header;
