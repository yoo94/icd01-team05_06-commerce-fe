import React from 'react';
import Search from "@/app/layout/components/search";
import HeaderButton from "@/app/layout/components/header-button";
import HeaderMenubar from "@/app/layout/components/header-menubar";
import HamburgerMenu from "@/app/layout/components/header-hamburgermenu";

const Header: React.FC = () => {
    return (
        <header className="w-full p-4 bg-background">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="hidden md:flex">
                        <HeaderMenubar />
                    </div>
                    <div className="flex md:hidden">
                        <HamburgerMenu />
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="hidden md:flex">
                            <Search />
                        </div>
                        <HeaderButton />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
