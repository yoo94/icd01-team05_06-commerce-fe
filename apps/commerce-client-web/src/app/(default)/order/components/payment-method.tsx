import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const PaymentMethod: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>결제수단</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <input type="radio" id="bankTransfer" name="paymentMethod" className="mr-2" />
          <Label htmlFor="bankTransfer">무통장입금</Label>
        </div>
        <div>
          <Select className="w-full">
            <option>은행을 선택하세요</option>
            <option>국민은행</option>
            <option>신한은행</option>
          </Select>
        </div>
        <div className="mt-4">
          <Label>입금자명</Label>
          <Input type="text" placeholder="입금자명 (미입력시 주문자명)" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
