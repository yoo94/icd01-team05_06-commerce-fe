import { getUserInfo } from '@/app/actions/auth-action';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePaymentStore } from '@/stores/use-payment-store';
import { useUserStore } from '@/stores/use-user-store';
import { useEffect } from 'react';

const PaymentUserInfo = () => {
  const { authToken } = useUserStore();
  const userInfo = usePaymentStore((state) => state.userInfo);
  const setUserInfo = usePaymentStore((state) => state.setUserInfo);

  useEffect(() => {
    if (authToken) {
      const fetchUserInfo = async () => {
        try {
          const fetchedUserInfo = await getUserInfo();
          setUserInfo({
            name: fetchedUserInfo.name,
            phone: fetchedUserInfo.phone,
            email: fetchedUserInfo.email,
          });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, [authToken, setUserInfo]);

  const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
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
              value={userInfo.name}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">연락처</Label>
            <Input
              type="text"
              placeholder="연락처"
              name="phone"
              value={userInfo.phone}
              onChange={onUserChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">이메일</Label>
            <Input
              type="email"
              placeholder="이메일"
              name="email"
              value={userInfo.email}
              onChange={onUserChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentUserInfo;
