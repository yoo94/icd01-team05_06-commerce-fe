import { PaymentInfo as Payment } from '@/types/order-types';
import { Info, InfoRow, InfoTable } from './info';

interface PaymentProps {
  paymentInfo: Payment;
}

const PaymentInfo = ({ paymentInfo }: PaymentProps) => {
  return (
    <Info title="결제 정보">
      <InfoTable>
        <InfoRow title="결제 방법" content={paymentInfo.method} />
        <InfoRow
          title="총 주문 금액"
          content={`${paymentInfo.price.toLocaleString()}원`}
          borderTop
        />
        <InfoRow
          title="실 주문 금액"
          content={`${paymentInfo.discountedPrice.toLocaleString()}원`}
          borderTop
        />
      </InfoTable>
    </Info>
  );
};

export default PaymentInfo;
