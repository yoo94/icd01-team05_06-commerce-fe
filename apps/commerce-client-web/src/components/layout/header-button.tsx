import Link from 'next/link';
import { ShoppingCart, User2 } from 'lucide-react';

const HeaderButton = () => {
  return (
    <>
      <Link href={'/cart'}>
        <ShoppingCart className="size-7" />
      </Link>
      <Link
        href={'/me'}
        className="flex size-10 items-center justify-center rounded-full bg-lime-500 text-white shadow-md"
      >
        <User2 className="size-6" />
      </Link>
    </>
  );
};

export default HeaderButton;
