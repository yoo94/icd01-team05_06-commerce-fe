import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const orders = [
  {
    orderId: 131231313,
    orderDate: new Date(),
    title: '딸아, 돈 공부 절대 미루지 마라',
    price: 16200,
    amount: 1,
    orderer: '이향기',
    recipient: '이향기',
  },
];

export default function OrderTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>주문일자</TableHead>
          <TableHead>주문내역</TableHead>
          <TableHead>주문금액/수량</TableHead>
          <TableHead>주문상태</TableHead>
          <TableHead>배송조회</TableHead>
          <TableHead>주문자</TableHead>
          <TableHead>수령자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
            <TableCell>{order.title}</TableCell>
            <TableCell>
              {order.price}/{order.amount}
            </TableCell>
            <TableCell>배송완료</TableCell>
            <TableCell>조회</TableCell>
            <TableCell>{order.orderer}</TableCell>
            <TableCell>{order.recipient}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
