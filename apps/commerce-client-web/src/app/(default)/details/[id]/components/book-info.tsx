import React from 'react';

interface BookInfoPageProps {
  description: string;
}

const BookInfoPage = ({ description }: BookInfoPageProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">도서정보</h2>
      <div>{description}</div>
    </div>
  );
};

export default BookInfoPage;
