import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PaymentAgreement: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>동의 및 결제하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center">
          <Checkbox id="agreeAll" />
          <Label htmlFor="agreeAll" className="ml-2">
            전체 동의
          </Label>
        </div>
        <div className="mb-2 flex items-center">
          <Checkbox id="agreePersonal" />
          <Label htmlFor="agreePersonal" className="ml-2">
            개인정보 수집 및 이용 동의
          </Label>
        </div>
        <div className="mb-4 flex items-center">
          <Checkbox id="agreePurchase" />
          <Label htmlFor="agreePurchase" className="ml-2">
            구매조건 확인 및 결제 진행에 동의
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">결제하기</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentAgreement;
