import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MenuList from './menu-list';

const menuItems = [
  {
    title: '주문내역',
    items: [{ title: '주문내역/배송조회', route: '/me/orders' }],
  },
  {
    title: '회원정보',
    items: [{ title: '회원정보관리', route: '/me/user-info' }],
  },
];

const sideBarButtons = [
  { title: '나의 1:1 문의 내역', route: '/inquiries' },
  { title: '나의 리뷰', route: '/me/reviews' },
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
