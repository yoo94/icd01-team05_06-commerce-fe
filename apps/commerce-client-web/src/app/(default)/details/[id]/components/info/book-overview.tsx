import React from 'react';

type BookOverviewProps = {
  description?: string;
};

const BookOverview = ({ description }: BookOverviewProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">책소개</h2>
      <p>{description ? description : '책 소개 정보가 없습니다.'}</p>
    </div>
  );
};

export default BookOverview;
