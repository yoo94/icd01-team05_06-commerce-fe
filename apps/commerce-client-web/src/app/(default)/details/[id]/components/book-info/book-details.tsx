import { Product } from '@/types/product-types';

type BookDetailsProps = {
  book: Product;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">품목정보</h2>
      <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
        <tbody>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">발행일</td>
            <td className="border px-4 py-2 font-extralight">{book.publishDate}</td>
          </tr>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">쪽수</td>
            <td className="border px-4 py-2 font-extralight">{book.pages} 쪽</td>
          </tr>
          <tr>
            <td className="border bg-slate-100 px-4 py-2 font-bold">ISBN10</td>
            <td className="border px-4 py-2 font-extralight">{book.isbn}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
