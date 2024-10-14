import { format } from 'date-fns';
import { OrderStatus } from '@/types/order-types';
import { orderStatusLabels } from '@/lib/labels';
import { Info, InfoRow, InfoTable } from './info';

interface BasicInfoProps {
  orderNumber: string;
  orderStatus: OrderStatus;
  orderDate: string;
}

const BasicInfo = ({ orderNumber, orderStatus, orderDate }: BasicInfoProps) => {
  return (
    <Info title="기본 정보">
      <InfoTable>
        <InfoRow title="주문 번호" content={orderNumber} />
        <InfoRow title="주문 상태" content={orderStatusLabels[orderStatus]} borderTop />
        <InfoRow
          title="주문일"
          content={format(orderDate, 'yyyy년 MM월 dd일 HH시 mm분')}
          borderTop
        />
      </InfoTable>
    </Info>
  );
};

export default BasicInfo;
