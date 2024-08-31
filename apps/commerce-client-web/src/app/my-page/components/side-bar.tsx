import { Button } from '@/components/ui/button';
import MenuList from '@/app/my-page/components/menu-list';
import Separator from '@/app/my-page/components/separator';

const orderListItems = ['주문내역/배송조회', '반품/교환신청 및 조회', '취소 주문내역'];
const userInfoItems = ['배송주소록', '회원정보관리', '마케팅 수신 및 정보 제공 동의 관리'];

export default function SideBar() {
  return (
    <aside className="flex min-h-[800px] w-[200px] flex-col gap-6 rounded-md border p-4 font-nanumeneo text-sm">
      <MenuList title="주문내역" items={orderListItems} />
      <Separator />
      <MenuList title="회원정보" items={userInfoItems} />
      <Separator />
      <div className="mt-8 flex flex-col gap-4">
        <Button>찜 목록</Button>
        <Button>나의 1:1 문의 내역</Button>
        <Button>나의 리뷰</Button>
      </div>
    </aside>
  );
}
