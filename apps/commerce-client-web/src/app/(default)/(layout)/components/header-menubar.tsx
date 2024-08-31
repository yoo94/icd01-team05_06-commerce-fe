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

type SubSubMenuItem = {
  title: string;
  href: string;
};

type SubMenuItem = {
  title: string;
  subSubMenu: SubSubMenuItem[];
};

type MenuItemWithSubMenu = {
  title: string;
  subMenu: SubMenuItem[];
};

type MenuItemWithHref = {
  title: string;
  href: string;
};

type MenuItem = MenuItemWithSubMenu | MenuItemWithHref;

const mock: MenuItem[] = [
  {
    title: '전체 카테고리',
    subMenu: [
      {
        title: '국내도서',
        subSubMenu: [
          { title: '소설', href: '/menu/1-1' },
          { title: '시', href: '/menu/1-2' },
          { title: '에세이', href: '/menu/1-2' },
          { title: '인문', href: '/menu/1-2' },
          { title: '역사', href: '/menu/1-2' },
          { title: '청소년', href: '/menu/1-2' },
          { title: '사회', href: '/menu/1-2' },
        ],
      },
      {
        title: '외국도서',
        subSubMenu: [
          { title: 'Sub Menu 2-1', href: '/menu/2-1' },
          { title: 'Sub Menu 2-2', href: '/menu/2-2' },
        ],
      },
      {
        title: 'eBook',
        subSubMenu: [
          { title: 'Sub Menu 3-1', href: '/menu/3-1' },
          { title: 'Sub Menu 3-2', href: '/menu/3-2' },
        ],
      },
    ],
  },
  {
    title: '베스트 셀러',
    href: '/menu/2',
  },
];

// Type guard function
const isMenuItemWithSubMenu = (menu: MenuItem): menu is MenuItemWithSubMenu => {
  return 'subMenu' in menu;
};

const HeaderMenubar: React.FC = () => {
  return (
    <Menubar className="flex space-x-6 border-0">
      {mock.map((menu, index) => (
        <MenubarMenu key={index}>
          {isMenuItemWithSubMenu(menu) ? (
            <>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {menu.title}
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg bg-white p-2 shadow-lg">
                {menu.subMenu.map((subMenuItem, subIndex) =>
                  subMenuItem.subSubMenu ? (
                    <MenubarSub key={subIndex}>
                      <MenubarSubTrigger className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {subMenuItem.title}
                      </MenubarSubTrigger>
                      <MenubarSubContent className="ml-2 mt-2 rounded-lg bg-gray-100 p-2 shadow-lg">
                        {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                          <MenubarItem key={subSubIndex} asChild>
                            <Link href={subSubMenuItem.href} passHref>
                              <span className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                {subSubMenuItem.title}
                              </span>
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  ) : null,
                )}
              </MenubarContent>
            </>
          ) : (
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link href={menu.href} passHref>
                  <span className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    {menu.title}
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default HeaderMenubar;
