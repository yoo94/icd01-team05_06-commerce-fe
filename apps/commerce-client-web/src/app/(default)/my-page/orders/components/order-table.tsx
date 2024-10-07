import { format } from 'date-fns';
import { Order, OrderStatus } from '@/types/order-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface OrderTableProps {
  orders: Order[];
}

const formatDate = (date: string) => format(date, 'yyyy.MM.dd');

const orderStatusTitles: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: '주문 생성',
  [OrderStatus.PROCESSING]: '주문 처리중',
  [OrderStatus.SHIPPED]: '배송중',
  [OrderStatus.DELIVERED]: '배송완료',
  [OrderStatus.CANCEL]: '주문 취소',
  [OrderStatus.REFUND]: '환불',
  [OrderStatus.EXCHANGE]: '교환',
};

const OrderTable = async ({ orders }: OrderTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">주문번호</TableHead>
          <TableHead className="min-w-[100px]">주문일자</TableHead>
          <TableHead className="min-w-[200px]">주문내역</TableHead>
          <TableHead className="min-w-[100px]">주문금액</TableHead>
          <TableHead className="min-w-[100px]">주문상태</TableHead>
          <TableHead className="min-w-[80px]">주문자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderNumber}>
            <TableCell>{order.orderNumber}</TableCell>
            <TableCell>{formatDate(order.orderDate)}</TableCell>
            <TableCell>{order.content}</TableCell>
            <TableCell>{order.pricie.toLocaleString()}원</TableCell>
            <TableCell>{orderStatusTitles[order.status]}</TableCell>
            <TableCell>{order.memberName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
