import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Order {
  id: number;
  orderDate: string;
  orderItems: {
    book: {
      title: string;
    };
  }[];
  finalPrice: number;
  status: string;
  user: {
    username: string;
  };
}

function formatDate(date: string) {
  return format(date, 'yyyy.MM.dd');
}

function formatTitle(items: { book: { title: string } }[]) {
  return items.map((item) => item.book.title).join(', ');
}

const OrderTable = async () => {
  const res = await fetch('https://example.com/orders');
  const orders: Order[] = await res.json();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">주문번호</TableHead>
          <TableHead className="min-w-[100px]">주문일자</TableHead>
          <TableHead className="min-w-[400px]">주문내역</TableHead>
          <TableHead className="min-w-[100px]">주문금액</TableHead>
          <TableHead className="min-w-[100px]">주문상태</TableHead>
          <TableHead className="min-w-[100px]">배송조회</TableHead>
          <TableHead className="min-w-[80px]">주문자</TableHead>
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
};

export default OrderTable;
