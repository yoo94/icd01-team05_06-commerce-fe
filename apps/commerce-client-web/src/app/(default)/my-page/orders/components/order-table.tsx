import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import orders from '@/data/orders.json';

function formatDate(date: string) {
  return format(date, 'yyyy.MM.dd');
}

function formatTitle(items: { book: { title: string } }[]) {
  return items.map((item) => item.book.title).join(', ');
}

export default function OrderTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>주문일자</TableHead>
          <TableHead className="w-[400px]">주문내역</TableHead>
          <TableHead>주문금액</TableHead>
          <TableHead>주문상태</TableHead>
          <TableHead>배송조회</TableHead>
          <TableHead>주문자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatDate(order.orderDate)}</TableCell>
            <TableCell>{formatTitle(order.orderItems)}</TableCell>
            <TableCell>{order.finalPrice}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>조회</TableCell>
            <TableCell>{order.user.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
