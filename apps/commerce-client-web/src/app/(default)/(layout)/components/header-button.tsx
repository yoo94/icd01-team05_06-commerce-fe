import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useAuthStore from '@/stores/useAuthStore';

const HeaderButton: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button onClick={logout}>로그아웃</Button>
          <Button asChild>
            <Link href={'/myPage'}>마이페이지</Link>
          </Button>
          <Button asChild>
            <Link href={'/myPage'}>장바구니</Link>
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
