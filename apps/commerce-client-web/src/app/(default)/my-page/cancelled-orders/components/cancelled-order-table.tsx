import { format } from 'date-fns';
import orders from '@/data/orders.json';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function formatDate(date: string) {
  return format(date, 'yyyy.MM.dd');
}

function formatTitle(items: { book: { title: string } }[]) {
  return items.map((item) => item.book.title).join(', ');
}

export default function CancelledOrderTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문일</TableHead>
          <TableHead className="w-24">주문번호</TableHead>
          <TableHead>주문내역</TableHead>
          <TableHead className="w-24">조회/취소</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.slice(-10).map((order) => (
          <TableRow key={order.id}>
            <TableCell>{formatDate(order.orderDate)}</TableCell>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatTitle(order.orderItems)}</TableCell>
            <TableCell>조회/취소</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
