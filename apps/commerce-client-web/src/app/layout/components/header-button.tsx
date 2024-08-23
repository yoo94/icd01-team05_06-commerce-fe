import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const HeaderButton: React.FC = () => {
    const isLogin = false; // 현재는 로그인 상태를 false 설정
    return (
        <>
            {isLogin ? (
                <>
                    <Button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                        <Link href={"/myPage"}>
                            마이페이지
                        </Link>
                    </Button>
                    <Button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                        <Link href={"/order"}>
                            order
                        </Link>
                    </Button>
                    <Button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity">
                        <Link href={"/logout"}>
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
        </>
    );
};

export default HeaderButton;
