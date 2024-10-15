'use client';

import useAuthStore from '@/stores/use-auth-store';
import NavLinks from '@/components/common/nav-links';
import { logout } from '@/app/actions/auth-action';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/use-user-store';

const TopBar = () => {
  const router = useRouter();
  const { isLoggedIn, resetAuthState } = useAuthStore();
  const { resetUserState } = useUserStore();
  const handleLogout = async () => {
    try {
      await logout();

      resetAuthState();
      resetUserState();

      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const links = isLoggedIn
    ? [
        { href: '#', label: '로그아웃', onClick: handleLogout },
        {
          href: '#',
          label: '고객센터',
        },
      ]
    : [
        { href: '/signup', label: '회원가입' },
        { href: '/login', label: '로그인' },
        {
          href: '#',
          label: '고객센터',
        },
      ];

  return (
    <div className="hidden bg-[#F4F4F4] py-3 text-right text-xs md:block">
      <div className="max-w-screen-xs container mx-auto flex justify-end space-x-4 px-4 text-slate-500 sm:max-w-screen-md md:h-fit md:max-w-screen-lg">
        <NavLinks links={links} fontSize="text-xs" />
      </div>
    </div>
  );
};

export default TopBar;
