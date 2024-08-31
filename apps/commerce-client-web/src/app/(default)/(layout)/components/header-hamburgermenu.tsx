'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 타입 정의
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
    title: 'Home',
    href: '/',
  },
  {
    title: '전체 카테고리',
    subMenu: [
      {
        title: '가전',
        subSubMenu: [
          { title: 'Sub Menu 1-1', href: '/menu/1-1' },
          { title: 'Sub Menu 1-2', href: '/menu/1-2' },
        ],
      },
      {
        title: '식품',
        subSubMenu: [
          { title: 'Sub Menu 2-1', href: '/menu/2-1' },
          { title: 'Sub Menu 2-2', href: '/menu/2-2' },
        ],
      },
      {
        title: '의류',
        subSubMenu: [
          { title: 'Sub Menu 3-1', href: '/menu/3-1' },
          { title: 'Sub Menu 3-2', href: '/menu/3-2' },
        ],
      },
      {
        title: '기타',
        subSubMenu: [
          { title: 'Sub Menu 4-1', href: '/menu/4-1' },
          { title: 'Sub Menu 4-2', href: '/menu/4-2' },
        ],
      },
    ],
  },
  {
    title: '베스트',
    href: '/menu/2',
  },
  {
    title: '세일',
    href: '/menu/3',
  },
];

// 타입 가드 함수
const isMenuItemWithSubMenu = (menu: MenuItem): menu is MenuItemWithSubMenu => {
  return 'subMenu' in menu;
};

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSubMenu = (index: number) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    } else {
      setActiveSubMenu(index);
      setActiveSubSubMenu(null);
    }
  };

  const toggleSubSubMenu = (index: number) => {
    if (activeSubSubMenu === index) {
      setActiveSubSubMenu(null);
    } else {
      setActiveSubSubMenu(index);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex size-8 flex-col items-center justify-center space-y-1 border-none bg-transparent focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-transform${isOpen ? ' translate-y-1.5 rotate-45' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity ${isOpen ? ' opacity-0' : ' opacity-100'}`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform${isOpen ? ' -translate-y-1.5 -rotate-45' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between border-b p-4">
            <button className="text-2xl" onClick={toggleMenu}>
              &times;
            </button>
          </div>
          <ul className="flex flex-col space-y-2 p-4">
            {mock.map((menu, index) => (
              <li key={index}>
                {isMenuItemWithSubMenu(menu) ? (
                  <div>
                    <button
                      className="w-full rounded-md p-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => toggleSubMenu(index)}
                    >
                      {menu.title}
                    </button>
                    {activeSubMenu === index && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {menu.subMenu.map((subMenuItem, subIndex) => (
                          <li key={subIndex}>
                            <div>
                              <button
                                className="w-full rounded-md p-2 text-left text-gray-600 hover:bg-gray-200"
                                onClick={() => toggleSubSubMenu(subIndex + index * 100)}
                              >
                                {subMenuItem.title}
                              </button>
                              {activeSubSubMenu === subIndex + index * 100 && (
                                <ul className="ml-4 mt-2 space-y-2">
                                  {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                                    <li key={subSubIndex}>
                                      <Link href={subSubMenuItem.href} onClick={closeMenu}>
                                        <span className="block rounded-md p-2 text-gray-500 hover:bg-gray-300">
                                          {subSubMenuItem.title}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={menu.href} onClick={closeMenu}>
                    <span className="block rounded-md p-2 text-gray-700 hover:bg-gray-100">
                      {menu.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
