import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Our - mind Store</h1>
        <Separator className="my-4" />
      </div>

      <nav className="flex flex-col space-y-2">
        <Link href="/productList" passHref>
          <Button asChild variant="link" className="justify-start text-black">
            <span>ALL PRODUCT</span>
          </Button>
        </Link>
        <Link href="/notice" passHref>
          <Button asChild variant="link" className="justify-start text-black">
            <span>NOTICE</span>
          </Button>
        </Link>
        <Link href="/faq" passHref>
          <Button asChild variant="link" className="justify-start text-black">
            <span>FAQ</span>
          </Button>
        </Link>
        <Link href="/contact" passHref>
          <Button asChild variant="link" className="justify-start text-black">
            <span>CONTACT</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
}
