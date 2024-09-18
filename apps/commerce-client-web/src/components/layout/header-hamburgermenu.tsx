'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MainMenu } from '@/types/menu-types';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useAuthStore from '@/stores/use-auth-store';

interface HamburgerMenuProps {
  mainMenu: MainMenu[];
}

const HamburgerMenu = ({ mainMenu }: HamburgerMenuProps) => {
  const { data: session } = useSession();
  const { logout } = useAuthStore();

  const isAuthenticated = !!session;

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<number | null>(null);
  const [activeItems, setActiveItems] = useState<number | null>(null);
  const [activeSubItems, setActiveSubItems] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveCategories(null);
    setActiveItems(null);
    setActiveSubItems(null);
  };

  const toggleCategories = (index: number) => {
    if (activeCategories === index) {
      setActiveCategories(null);
      setActiveItems(null);
      setActiveSubItems(null);
    } else {
      setActiveCategories(index);
      setActiveItems(null);
      setActiveSubItems(null);
    }
  };

  const toggleItems = (index: number) => {
    if (activeItems === index) {
      setActiveItems(null);
      setActiveSubItems(null);
    } else {
      setActiveItems(index);
      setActiveSubItems(null);
    }
  };

  const toggleSubItems = (index: number) => {
    if (activeSubItems === index) {
      setActiveSubItems(null);
    } else {
      setActiveSubItems(index);
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
          className={`block h-0.5 w-6 bg-current transition-transform${
            isOpen ? ' translate-y-1.5 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity ${
            isOpen ? ' opacity-0' : ' opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform${
            isOpen ? ' -translate-y-1.5 -rotate-45' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-14 z-50 flex flex-col border-t bg-white">
          <div className="container flex justify-center space-x-5 px-8 pb-4 pt-8">
            {isAuthenticated ? (
              <>
                <Button variant={'outline'} onClick={logout}>
                  로그아웃
                </Button>
                <Button asChild>
                  <Link href={'/myPage'}>마이페이지</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="max-w-40 flex-1 rounded-full">
                  <Link href={'/login'}>로그인</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary max-w-40 flex-1 rounded-full"
                >
                  <Link href={'/join'}>회원가입</Link>
                </Button>
              </>
            )}
          </div>
          <ul className="container flex flex-col space-y-2 p-4">
            {mainMenu.map((menu, index) => (
              <li key={index}>
                <div>
                  <button
                    className="w-full rounded-md p-2 text-left text-slate-700 hover:bg-slate-100"
                    onClick={() => toggleCategories(index)}
                  >
                    {menu.title}
                  </button>
                  {menu.categories && activeCategories === index && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {menu.categories.map((category, categoryIndex) => (
                        <li key={categoryIndex}>
                          <div>
                            <button
                              className="w-full rounded-md p-2 text-left text-slate-600 hover:bg-slate-200"
                              onClick={() => toggleItems(categoryIndex)}
                            >
                              {category.title}
                            </button>
                            {category.items && activeItems === categoryIndex && (
                              <ul className="ml-4 mt-2 space-y-2">
                                {category.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <div>
                                      <button
                                        className="w-full rounded-md p-2 text-left text-slate-600 hover:bg-slate-300"
                                        onClick={() => toggleSubItems(itemIndex)}
                                      >
                                        {item.title}
                                      </button>
                                      {item.items && activeSubItems === itemIndex && (
                                        <ul className="ml-4 mt-2 space-y-2">
                                          {item.items.map((subItem, subItemIndex) => (
                                            <li key={subItemIndex}>
                                              <Link
                                                href={{
                                                  pathname: '/search',
                                                  query: {
                                                    category: subItem.title,
                                                  },
                                                }}
                                                onClick={closeMenu}
                                              >
                                                <span className="block rounded-md p-2 font-light text-slate-600 hover:bg-slate-200">
                                                  {subItem.title}
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
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
