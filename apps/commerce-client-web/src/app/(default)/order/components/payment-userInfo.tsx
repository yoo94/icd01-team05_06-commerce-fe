import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const mockUser = {
  name: '유재석',
  phnum: '01024129368',
  email: 'ddd@naver.com',
};
const PaymentUserInfo = () => {
  const [user, setUser] = useState(mockUser);
  const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">주문자 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="mb-1 block text-xs text-slate-500">이름</Label>
            <Input
              type="text"
              placeholder="이름"
              name="name"
              value={user.name}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">연락처</Label>
            <Input
              type="text"
              placeholder="연락처"
              name="phnum"
              value={user.phnum}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">이메일</Label>
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
