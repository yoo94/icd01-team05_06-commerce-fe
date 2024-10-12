'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PaymentAgreement = () => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreePurchase, setAgreePurchase] = useState(false);

  // 전체 동의 클릭 시
  const handleAgreeAll = () => {
    const newAgreeState = !agreeAll;
    setAgreeAll(newAgreeState);
    setAgreePersonal(newAgreeState);
    setAgreePurchase(newAgreeState);
  };

  // 개별 항목 선택 시 전체 동의 상태 업데이트
  const handleIndividualAgree = (setAgreeFn: (val: boolean) => void, newVal: boolean) => {
    setAgreeFn(newVal);

    // 모든 개별 항목이 선택되었는지 확인 후 전체 동의 상태 업데이트
    if (!newVal) {
      setAgreeAll(false);
    } else if (newVal && agreePersonal && agreePurchase) {
      setAgreeAll(true);
    }
  };

  // 동의 항목들 모두 선택해야 결제 버튼 활성화
  const isButtonDisabled = !(agreePersonal && agreePurchase);
  return (
    <Card className="w-full border shadow-md">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">동의 및 결제하기</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 전체 동의 */}
        <div className="mb-4 flex items-center">
          <Checkbox id="agreeAll" checked={agreeAll} onCheckedChange={handleAgreeAll} />
          <Label htmlFor="agreeAll" className="ml-2 text-base text-slate-600">
            전체 동의
          </Label>
        </div>

        {/* 개인정보 수집 및 이용 동의 */}
        <div className="mb-2 ml-2 flex items-center">
          <Checkbox
            id="agreePersonal"
            checked={agreePersonal}
            onCheckedChange={(checked: boolean) => handleIndividualAgree(setAgreePersonal, checked)}
          />
          <Label htmlFor="agreePersonal" className="ml-2 text-sm text-slate-500">
            개인정보 수집 및 이용 동의
          </Label>
        </div>

        {/* 구매조건 확인 및 결제 진행 동의 */}
        <div className="mb-4 ml-2 flex items-center">
          <Checkbox
            id="agreePurchase"
            checked={agreePurchase}
            onCheckedChange={(checked: boolean) => handleIndividualAgree(setAgreePurchase, checked)}
          />
          <Label htmlFor="agreePurchase" className="ml-2 text-sm text-slate-500">
            구매조건 확인 및 결제 진행에 동의
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        {/* 동의 항목들이 선택되지 않으면 버튼을 비활성화 */}
        <Button className="w-full text-white" disabled={isButtonDisabled} onClick={() => {}}>
          결제하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentAgreement;
