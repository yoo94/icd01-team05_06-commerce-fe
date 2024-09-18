import React from 'react';

type ProductDetailsProps = {
  publicationDate?: string;
  pages?: string;
  weight?: string;
  size?: string;
  isbn10?: string;
};

const ProductDetails = ({ publicationDate, pages, weight, size, isbn10 }: ProductDetailsProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">품목정보</h2>
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <tbody>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">발행일</td>
            <td className="border px-4 py-2">{publicationDate || '정보없음'}</td>
          </tr>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">쪽수</td>
            <td className="border px-4 py-2">{pages || '정보없음'}</td>
          </tr>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">무게</td>
            <td className="border px-4 py-2">{weight || '정보없음'}</td>
          </tr>
          <tr>
            <td className="w-32 border bg-slate-100 px-4 py-2 font-bold">크기</td>
            <td className="border px-4 py-2">{size || '정보없음'}</td>
          </tr>
          <tr>
            <td className="border bg-slate-100 px-4 py-2 font-bold">ISBN10</td>
            <td className="border px-4 py-2">{isbn10 || '정보없음'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
