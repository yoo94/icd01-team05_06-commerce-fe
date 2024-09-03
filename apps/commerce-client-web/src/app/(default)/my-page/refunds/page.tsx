import { Button } from '@/components/ui/button';
import RefundTable from '@/app/(default)/my-page/refunds/components/refund-table';
import SearchForm from '@/app/(default)/my-page/refunds/components/search-form';
import RefundNotice from '@/app/(default)/my-page/refunds/components/refund-notice';

export default function Page() {
  return (
    <div className="flex flex-col gap-4 font-nanumeneo text-sm">
      <header>반품/교환신청 및 조회</header>
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-500">
          구매하셨던 상품의 반품/교환/추가배송 신청 및 내역을 조회하실 수 있습니다.
        </div>
        <Button size="sm">반품/교환 신청하기</Button>
      </div>
      <SearchForm />
      <RefundTable />
      <RefundNotice />
    </div>
  );
}
