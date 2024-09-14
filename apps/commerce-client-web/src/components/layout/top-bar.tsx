import useAuthStore from '@/stores/use-auth-store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const TopBar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const { logout } = useAuthStore();
  return (
    <div className="hidden bg-slate-50 py-2.5 text-right text-xs md:block">
      <div className="container mx-auto flex justify-end space-x-4 px-4 text-slate-400">
        {isAuthenticated ? (
          <span onClick={logout} className="transition-colors duration-200 hover:text-slate-800">
            로그아웃
          </span>
        ) : (
          <>
            <Link href="/signup" className="transition-colors duration-200 hover:text-slate-800">
              회원가입
            </Link>
            <span>|</span>
            <Link href="/login" className="transition-colors duration-200 hover:text-slate-800">
              로그인
            </Link>
          </>
        )}

        <span>|</span>
        <Link href="/support" className="transition-colors duration-200 hover:text-slate-800">
          고객센터
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
