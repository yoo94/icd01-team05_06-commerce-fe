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

export default function RefundTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>접수일자</TableHead>
          <TableHead>원 주문번호</TableHead>
          <TableHead className="w-[400px]">주문내역</TableHead>
          <TableHead>신청내용</TableHead>
          <TableHead>처리상태</TableHead>
          <TableHead>배송</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.slice(-10).map((order) => (
          <TableRow key={order.id}>
            <TableCell>{formatDate(order.orderDate)}</TableCell>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatTitle(order.orderItems)}</TableCell>
            <TableCell>반품/교환</TableCell>
            <TableCell>{order.payment.status}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
