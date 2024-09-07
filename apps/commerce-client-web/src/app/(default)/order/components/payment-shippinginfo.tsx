import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface OrderType {
  name: string;
  phnum: string;
  address: string;
  detailAddress: string;
  memo: string;
}


interface PaymentShippingInfoProps {
  order: OrderType;
  onOrderChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentShippingInfo: React.FC<PaymentShippingInfoProps> = ({ order, onOrderChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>배송 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Checkbox id="sameAsOrderer" />
          <Label htmlFor="sameAsOrderer" className="ml-2">
            주문자 정보와 동일
          </Label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>수령인</Label>
            <Input
              type="text"
              placeholder="수령인"
              name="name"
              value={order.name}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              type="text"
              placeholder="연락처"
              name="phnum"
              value={order.phnum}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label>우편번호</Label>
            <Input type="text" placeholder="우편번호" className="flex-1" />
          </div>
          <div>
            <Label>주소</Label>
            <Input
              type="text"
              placeholder="주소"
              name="address"
              value={order.address}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label>상세주소</Label>
            <Input
              type="text"
              placeholder="상세주소"
              name="detailAddress"
              value={order.detailAddress}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label>배송 메모</Label>
            <Textarea
              placeholder="배송 메모를 입력하세요."
              name="memo"
              value={order.memo}
              onChange={onOrderChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentShippingInfo;
