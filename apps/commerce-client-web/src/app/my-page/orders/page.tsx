'use client';

import SearchBox from '@/app/my-page/components/search-box';
import OrderInfo from '@/app/my-page/components/order-info';

export default function Orders() {
  return (
    <div className="flex flex-col gap-4 font-nanumeneo">
      <header>주문내역/배송조회</header>
      <div className="flex flex-col gap-4">
        <div className="text-sm text-slate-500">최근 5년간 주문내역을 조회하실 수 있습니다.</div>
        <SearchBox />
        <OrderInfo />
      </div>
    </div>
  );
}
