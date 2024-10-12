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

const formatDate = (date: string) => format(new Date(date), 'yyyy.MM.dd');

const orderStatusTitles: Record<OrderStatus, string> = {
  [OrderStatus.ALL]: '',
  [OrderStatus.COMPLETED]: '주문 완료',
  [OrderStatus.CANCELLED]: '주문 취소',
  [OrderStatus.SHIPPING]: '배송중',
  [OrderStatus.DELIVERED]: '배송완료',
  [OrderStatus.REFUNDED]: '환불',
};

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed text-xs">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="hidden w-24 text-center md:table-cell">주문번호</TableHead>
            <TableHead className="w-20 text-center">주문일자</TableHead>
            <TableHead className="w-36 text-center">주문내역</TableHead>
            <TableHead className="w-24 text-center">주문금액</TableHead>
            <TableHead className="hidden w-20 text-center md:table-cell">주문상태</TableHead>
            <TableHead className="hidden w-20 text-center md:table-cell">주문자</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderNumber} className="text-center text-xs">
              <TableCell className="hidden truncate md:table-cell">{order.orderNumber}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell className="truncate">{order.content}</TableCell>
              <TableCell className="truncate">{order.price.toLocaleString()}원</TableCell>
              <TableCell className="hidden md:table-cell">
                {orderStatusTitles[order.status]}
              </TableCell>
              <TableCell className="hidden md:table-cell">{order.memberName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
