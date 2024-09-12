import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import useAuthStore from '@/stores/use-auth-store';
import { useSession } from 'next-auth/react';

const HeaderButton = () => {
  const { data: session } = useSession();
  const { logout } = useAuthStore();

  const isAuthenticated = !!session;

  return (
    <>
      <Link href={'/cart'}>
        <ShoppingCart />
      </Link>
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
        <Button asChild>
          <Link href={'/login'}>로그인</Link>
        </Button>
      )}
    </>
  );
};

export default HeaderButton;
