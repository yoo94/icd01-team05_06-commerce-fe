import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePaymentStore } from '@/stores/use-payment-store';

const PaymentAgreement = () => {
  const agreementInfo = usePaymentStore((state) => state.agreementInfo);
  const setAgreementInfo = usePaymentStore((state) => state.setAgreementInfo);
  const paymentState = usePaymentStore((state) => state);

  const handleAgreeAll = (checked: boolean | string) => {
    const isChecked = checked === true;
    setAgreementInfo({
      termsOfService: isChecked,
      privacyPolicy: isChecked,
      ageVerification: true, // 항상 true로 고정
    });
  };

  const handleIndividualAgree = (
    type: 'termsOfService' | 'privacyPolicy',
    checked: boolean | string,
  ) => {
    const isChecked = checked === true;
    setAgreementInfo({ ...agreementInfo, [type]: isChecked });
  };

  const allAgreed = agreementInfo.termsOfService && agreementInfo.privacyPolicy;
  const isButtonDisabled = !allAgreed;

  const handlePayment = () => {
    console.log('Payment Data:', paymentState);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">동의 및 결제하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Checkbox
            id="agreeAll"
            checked={allAgreed}
            onCheckedChange={(checked) => handleAgreeAll(checked)}
          />
          <Label htmlFor="agreeAll" className="ml-2 text-base text-slate-600">
            전체 동의
          </Label>
        </div>
        <div className="mb-2 ml-2 flex items-center">
          <Checkbox
            id="termsOfService"
            checked={agreementInfo.termsOfService}
            onCheckedChange={(checked) => handleIndividualAgree('termsOfService', checked)}
          />
          <Label htmlFor="termsOfService" className="ml-2 text-sm text-slate-500">
            개인정보 수집 및 이용 동의
          </Label>
        </div>
        <div className="mb-4 ml-2 flex items-center">
          <Checkbox
            id="privacyPolicy"
            checked={agreementInfo.privacyPolicy}
            onCheckedChange={(checked) => handleIndividualAgree('privacyPolicy', checked)}
          />
          <Label htmlFor="privacyPolicy" className="ml-2 text-sm text-slate-500">
            구매조건 확인 및 결제 진행에 동의
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isButtonDisabled} onClick={handlePayment}>
          결제하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentAgreement;
