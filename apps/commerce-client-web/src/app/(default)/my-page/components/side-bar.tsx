import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MenuList from './menu-list';

const menuItems = [
  {
    title: '주문내역',
    items: [{ title: '주문내역/배송조회', route: '/orders' }],
  },
  {
    title: '회원정보',
    items: [
      { title: '배송주소록', route: '/my-page/shipping-address' },
      { title: '회원정보관리', route: '/my-page/user-info' },
      { title: '마케팅 수신 및 정보 제공 동의 관리', route: '/marketing-consent' },
    ],
  },
];

const sideBarButtons = [
  { title: '찜 목록', route: '/wishlist' },
  { title: '나의 1:1 문의 내역', route: '/inquiries' },
  { title: '나의 리뷰', route: '/reviews' },
];

const SideBar = () => {
  return (
    <aside className="font-nanumeneo flex min-h-[800px] w-[200px] flex-col gap-6 rounded-md border p-4 text-sm">
      {menuItems.map((menu, index) => (
        <div key={index}>
          {/* MenuList 컴포넌트에 title과 items (route 정보 포함) 전달 */}
          <MenuList title={menu.title} items={menu.items} />
          <Separator />
        </div>
      ))}
      <div className="mt-8 flex flex-col gap-4">
        {sideBarButtons.map((button, index) => (
          <Button key={index} asChild variant="secondary">
            <Link className="text-xs text-slate-600" href={button.route}>
              {button.title}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
