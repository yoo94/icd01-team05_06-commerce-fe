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
    MenubarSubContent
} from '@/components/ui/menubar';

const mock = [
    {
        title: "전체 카테고리",
        subMenu: [
            {
                title: "국내도서",
                subSubMenu: [
                    { title: "소설", href: "/menu/1-1" },
                    { title: "시", href: "/menu/1-2" },
                    { title: "에세이", href: "/menu/1-2" },
                    { title: "인문", href: "/menu/1-2" },
                    { title: "역사", href: "/menu/1-2" },
                    { title: "청소년", href: "/menu/1-2" },
                    { title: "사회", href: "/menu/1-2" }
                ]
            },
            {
                title: "외국도서",
                subSubMenu: [
                    { title: "Sub Menu 2-1", href: "/menu/2-1" },
                    { title: "Sub Menu 2-2", href: "/menu/2-2" }
                ]
            },
            {
                title: "eBook",
                subSubMenu: [
                    { title: "Sub Menu 3-1", href: "/menu/3-1" },
                    { title: "Sub Menu 3-2", href: "/menu/3-2" }
                ]
            }
        ]
    },
    {
        title: "베스트 셀러",
        href: "/menu/2"
    },
];

const HeaderMenubar: React.FC = () => {
    return (
        <Menubar className="flex space-x-6 border-0">
            {mock.map((menu, index) => (
                <MenubarMenu key={index}>
                    {menu.subMenu ? (
                        <>
                            <MenubarTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                {menu.title}
                            </MenubarTrigger>
                            <MenubarContent className="bg-white shadow-lg rounded-lg p-2 mt-2">
                                {menu.subMenu.map((subMenuItem, subIndex) => (
                                    subMenuItem.subSubMenu ? (
                                        <MenubarSub key={subIndex}>
                                            <MenubarSubTrigger className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                                {subMenuItem.title}
                                            </MenubarSubTrigger>
                                            <MenubarSubContent className="bg-gray-100 shadow-lg rounded-lg p-2 mt-2 ml-2">
                                                {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                                                    <MenubarItem key={subSubIndex} asChild>
                                                        <Link href={subSubMenuItem.href} passHref>
                                                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md">
                                                                {subSubMenuItem.title}
                                                            </span>
                                                        </Link>
                                                    </MenubarItem>
                                                ))}
                                            </MenubarSubContent>
                                        </MenubarSub>
                                    ) : (
                                        <MenubarItem key={subIndex} asChild>
                                            <Link href={subMenuItem.href} passHref>
                                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                                    {subMenuItem.title}
                                                </span>
                                            </Link>
                                        </MenubarItem>
                                    )
                                ))}
                            </MenubarContent>
                        </>
                    ) : (
                        <MenubarMenu>
                            <MenubarTrigger asChild>
                                <Link href={menu.href} passHref>
                                    <span className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer">
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
