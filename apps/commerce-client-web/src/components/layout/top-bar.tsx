'use client';

import useAuthStore from '@/stores/use-auth-store';
import { useSession } from 'next-auth/react';
import NavLinks from '@/components/common/nav-links';

const TopBar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const { logout } = useAuthStore();

  const links = isAuthenticated
    ? [
        { href: '#', label: '로그아웃', onClick: logout },
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
      <div className="container mx-auto flex justify-end space-x-4 px-4 text-slate-500">
        <NavLinks links={links} fontSize="text-xs" />
      </div>
    </div>
  );
};

export default TopBar;
