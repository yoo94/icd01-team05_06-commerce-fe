import SearchBox from './components/search-box';
import OrderInfo from './components/order-info';

const Page = () => {
  return (
    <div className="font-nanumeneo flex flex-col gap-4">
      <header>주문내역/배송조회</header>
      <div className="flex flex-col gap-4">
        <div className="text-sm text-slate-500">최근 5년간 주문내역을 조회하실 수 있습니다.</div>
        <SearchBox />
        <OrderInfo />
      </div>
    </div>
  );
};

export default Page;
