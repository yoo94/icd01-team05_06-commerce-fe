import React from 'react';
import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar';
import { MainMenu } from '@/types/menu-types';

const mock: MainMenu[] = [
  {
    title: '전체 카테고리',
    categories: [
      {
        title: '국내도서',
        items: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
      {
        title: '외국도서',
        items: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
      {
        title: 'eBook',
        items: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
    ],
  },
  {
    title: '베스트셀러',
  },
  {
    title: '새로나온책',
  },
  {
    title: '추천도서',
  },
];

const HeaderMenubar = () => {
  return (
    <Menubar className="flex space-x-6 border-0">
      {mock.map((menu, index) => (
        <MenubarMenu key={index}>
          {menu.categories ? (
            <>
              <MenubarTrigger className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                {menu.title}
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg bg-white p-2 shadow-lg">
                {menu.categories.map((category, categoryIndex) => (
                  <MenubarSub key={categoryIndex}>
                    <MenubarSubTrigger className="rounded-md p-4 text-sm text-gray-700 hover:bg-gray-100">
                      {category.title}
                    </MenubarSubTrigger>
                    {category.items && (
                      <MenubarSubContent className="ml-2 mt-2 rounded-lg p-2 shadow-lg">
                        {category.items.map((item, itemIndex) => (
                          <MenubarItem key={itemIndex} asChild>
                            <Link
                              href={{
                                pathname: '/search',
                                query: {
                                  category: item.title,
                                },
                              }}
                              passHref
                            >
                              <span className="w-full rounded-md px-4 py-2 text-sm">
                                {item.title}
                              </span>
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    )}
                  </MenubarSub>
                ))}
              </MenubarContent>
            </>
          ) : (
            <MenubarTrigger asChild>
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    tag: menu.title,
                  },
                }}
                passHref
              >
                <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm font-medium transition-colors">
                  {menu.title}
                </span>
              </Link>
            </MenubarTrigger>
          )}
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default HeaderMenubar;
