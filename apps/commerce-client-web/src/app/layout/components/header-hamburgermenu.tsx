'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const mock = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "전체 카테고리",
        subMenu: [
            {
                title: "가전",
                subSubMenu: [
                    { title: "Sub Menu 1-1", href: "/menu/1-1" },
                    { title: "Sub Menu 1-2", href: "/menu/1-2" }
                ]
            },
            {
                title: "식품",
                subSubMenu: [
                    { title: "Sub Menu 2-1", href: "/menu/2-1" },
                    { title: "Sub Menu 2-2", href: "/menu/2-2" }
                ]
            },
            {
                title: "의류",
                subSubMenu: [
                    { title: "Sub Menu 3-1", href: "/menu/3-1" },
                    { title: "Sub Menu 3-2", href: "/menu/3-2" }
                ]
            },
            {
                title: "기타",
                subSubMenu: [
                    { title: "Sub Menu 4-1", href: "/menu/4-1" },
                    { title: "Sub Menu 4-2", href: "/menu/4-2" }
                ]
            }
        ]
    },
    {
        title: "베스트",
        href: "/menu/2"
    },
    {
        title: "세일",
        href: "/menu/3"
    }
];

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
            setActiveSubSubMenu(null); // 서브 메뉴가 닫힐 때 서브 서브 메뉴도 닫기
        } else {
            setActiveSubMenu(index);
            setActiveSubSubMenu(null); // 새로운 서브 메뉴를 열 때 서브 서브 메뉴 초기화
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
                className="flex flex-col items-center justify-center space-y-1 w-8 h-8 bg-transparent border-none focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-current transform transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}/>
                <span className={`block w-6 h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}/>
                <span className={`block w-6 h-0.5 bg-current transform transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}/>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <button
                            className="text-2xl"
                            onClick={toggleMenu}
                        >
                            &times;
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-2 p-4">
                        {mock.map((menu, index) => (
                            <li key={index}>
                                {menu.subMenu ? (
                                    <div>
                                        <button
                                            className="text-gray-700 hover:bg-gray-100 rounded-md p-2 w-full text-left"
                                            onClick={() => toggleSubMenu(index)}
                                        >
                                            {menu.title}
                                        </button>
                                        {activeSubMenu === index && (
                                            <ul className="mt-2 ml-4 space-y-2">
                                                {menu.subMenu.map((subMenuItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        {subMenuItem.subSubMenu ? (
                                                            <div>
                                                                <button
                                                                    className="text-gray-600 hover:bg-gray-200 rounded-md p-2 w-full text-left"
                                                                    onClick={() => toggleSubSubMenu(subIndex + index * 100)}
                                                                >
                                                                    {subMenuItem.title}
                                                                </button>
                                                                {activeSubSubMenu === subIndex + index * 100 && (
                                                                    <ul className="mt-2 ml-4 space-y-2">
                                                                        {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                                                                            <li key={subSubIndex}>
                                                                                <Link href={subSubMenuItem.href} onClick={closeMenu}>
                                                                                    <span className="text-gray-500 hover:bg-gray-300 rounded-md p-2 block">
                                                                                        {subSubMenuItem.title}
                                                                                    </span>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <Link href={subMenuItem.href} onClick={closeMenu}>
                                                                <span className="text-gray-600 hover:bg-gray-200 rounded-md p-2 block">
                                                                    {subMenuItem.title}
                                                                </span>
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link href={menu.href} onClick={closeMenu}>
                                        <span className="text-gray-700 hover:bg-gray-100 rounded-md p-2 block">
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
