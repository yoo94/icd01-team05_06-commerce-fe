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
          <InfoRow title="제목" content={product.title} />
          <InfoRow title="저자" content={product.author} borderTop />
          <InfoRow title="주문 수량" content={product.quantity} borderTop />
          <InfoRow title="가격" content={`${product.price.toLocaleString()}원`} borderTop />
        </InfoTable>
      ))}
    </Info>
  );
};

export default ProductsInfo;
