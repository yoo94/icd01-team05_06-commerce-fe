import Link from 'next/link';
import { OrderProduct } from '@/types/order-types';
import { Info, InfoRow, InfoTable } from './info';

interface ProductsInfoProps {
  products: OrderProduct[];
}

const ProductsInfo = ({ products }: ProductsInfoProps) => {
  return (
    <Info title="상품 정보">
      {products.map((product) => (
        <InfoTable key={product.id}>
          <InfoRow
            title="제목"
            content={
              <Link className="text-blue-700" href={`/details/${product.id}`}>
                {product.title}
              </Link>
            }
          />
          <InfoRow title="저자" content={product.author} borderTop />
          <InfoRow title="주문 수량" content={product.quantity} borderTop />
          <InfoRow title="가격" content={`${product.price.toLocaleString()}원`} borderTop />
        </InfoTable>
      ))}
    </Info>
  );
};

export default ProductsInfo;
