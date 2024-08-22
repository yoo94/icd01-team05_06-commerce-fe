import React from 'react';
import Link from 'next/link'; // Next.js의 Link 컴포넌트
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent
} from '@/components/ui/navigation-menu'; // NavigationMenu 관련 컴포넌트 임포트
import {Button} from '@/components/ui/button'; // ShadCN Button 컴포넌트 임포트

const Header: React.FC = () => {
    const isLogin = true; // 현재는 로그인 상태를 false 설정

    return (
        <header className="w-full p-4 bg-background">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    {/* Navigation Menu */}
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center space-x-4 lg:space-x-6">
                                <NavigationMenuItem>
                                    <Link href="/"
                                          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                        Products
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 mt-2">
                                        <ul className="flex space-x-2">
                                            <li>
                                                <Link href={"/menu/1"} passHref
                                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                                    menu 1
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/menu/2"} passHref
                                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                                    menu 2
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={"/menu/3"} passHref
                                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                                    menu 3
                                                </Link>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* 검색 및 로그인/마이페이지 버튼 */}
                    <div className="ml-auto flex items-center space-x-4">
                        <input
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]"
                            placeholder="Search..." type="search"
                        />
                        {isLogin ? (
                            <>
                                <Button
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                                    <Link href={"/myPage"} passHref>
                                        마이페이지
                                    </Link>
                                </Button>
                                <Button
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                                    <Link href={"/order"} passHref>
                                        order
                                    </Link>
                                </Button>
                                <Button
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                                    <Link href={"/logout"} passHref>
                                        logout
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                                로그인
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
