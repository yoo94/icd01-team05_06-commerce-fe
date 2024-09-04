import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PaymentUserInfo: React.FC<{
  user: any;
  onUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ user, onUserChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>주문자 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>이름</Label>
            <Input
              type="text"
              placeholder="이름"
              name="name"
              value={user.name}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              type="text"
              placeholder="연락처"
              name="phnum"
              value={user.phnum}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="이메일"
              name="email"
              value={user.email}
              onChange={onUserChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentUserInfo;
