import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const HeaderButton: React.FC = () => {
    const isLogin = false; // 현재는 로그인 상태를 false 설정
    return (
        <>
            {isLogin ? (
                <>
                    <Button className="text-slate-800">
                        <Link href={"/logout"}>
                            로그아웃
                        </Link>
                    </Button>
                    <Button className="text-slate-800">
                        <Link href={"/myPage"}>
                            마이페이지
                        </Link>
                    </Button>
                    <Button className="text-slate-800">
                        <Link href={"/myPage"}>
                            장바구니
                        </Link>
                    </Button>
                </>
            ) : (
                <Button className="text-slate-800">
                    <Link href={"/login"}>
                        로그인
                    </Link>
                </Button>
            )}
        </>
    );
};

export default HeaderButton;
