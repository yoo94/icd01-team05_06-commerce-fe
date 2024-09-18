import React from 'react';
import BookOverview from './book-overview';
import ProductDetails from './product-details';
import TableOfContents from './table-of-contents';

type InfoProps = {
  product: {
    description: string;
    publicationDate?: string;
    isbn10?: string;
  };
};

const Info = ({ product }: InfoProps) => {
  return (
    <div>
      <BookOverview description={product.description} />
      <ProductDetails publicationDate={product.publicationDate} isbn10={product.isbn10} />
      <TableOfContents />
    </div>
  );
};

export default Info;
