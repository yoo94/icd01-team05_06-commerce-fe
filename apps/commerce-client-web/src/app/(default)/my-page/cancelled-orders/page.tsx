import SearchForm from './components/search-form';
import SortOptionSelect from './components/sort-option-select';
import CancelledOrderTable from './components/cancelled-order-table';
import CancelNotice from './components/cancle-notice';

export default function Page() {
  return (
    <div className="flex flex-col gap-4 font-nanumeneo text-sm">
      <header>취소 주문내역</header>
      <SearchForm />
      <SortOptionSelect />
      <CancelledOrderTable />
      <CancelNotice />
    </div>
  );
}
