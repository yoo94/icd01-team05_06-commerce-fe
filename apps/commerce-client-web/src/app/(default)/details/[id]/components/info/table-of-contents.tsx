'use client';

import React from 'react';
import TableOfContentsData from '@/data/TableOfContents.json';

const TableOfContents = () => {
  const { content } = TableOfContentsData.tableOfContents;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">목차</h2>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
};

export default TableOfContents;
