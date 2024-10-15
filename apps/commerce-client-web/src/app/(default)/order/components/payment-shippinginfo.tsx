import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { usePaymentStore } from '@/stores/use-payment-store';
import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import Modal from '@/components/common/modal';

const PaymentShippingInfo = () => {
  const shippingInfo = usePaymentStore((state) => state.shippingInfo);
  const setShippingInfo = usePaymentStore((state) => state.setShippingInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCompletePostcode = (data: { zonecode: string; address: string }) => {
    setShippingInfo({
      ...shippingInfo,
      postalCode: data.zonecode,
      address: data.address,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">배송 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Checkbox
            id="sameAsOrderer"
            onCheckedChange={(checked) => {
              if (checked) {
                const { name, phone } = usePaymentStore.getState().userInfo;
                setShippingInfo({ ...shippingInfo, recipient: name, phone });
              } else {
                setShippingInfo({ ...shippingInfo, recipient: '', phone: '' });
              }
            }}
          />
          <Label htmlFor="sameAsOrderer" className="ml-2">
            주문자 정보와 동일
          </Label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="mb-1 block text-xs text-slate-500">수령인</Label>
            <Input
              type="text"
              placeholder="수령인"
              name="recipient"
              value={shippingInfo.recipient}
              onChange={onShippingChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">연락처</Label>
            <Input
              type="tel"
              placeholder="연락처"
              name="phone"
              value={shippingInfo.phone}
              onChange={onShippingChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">우편번호</Label>
            <Input
              className="cursor-pointer"
              type="text"
              placeholder="우편번호"
              name="postalCode"
              value={shippingInfo.postalCode}
              readOnly
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">주소</Label>
            <Input
              type="text"
              placeholder="주소"
              name="address"
              value={shippingInfo.address}
              readOnly
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">상세주소</Label>
            <Input
              type="text"
              placeholder="상세주소"
              name="detailAddress"
              value={shippingInfo.detailAddress}
              onChange={onShippingChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">배송 메모</Label>
            <Textarea
              placeholder="배송 메모를 입력하세요."
              name="memo"
              value={shippingInfo.memo}
              onChange={onShippingChange}
            />
          </div>
        </div>
      </CardContent>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DaumPostcode onComplete={handleCompletePostcode} />
      </Modal>
    </Card>
  );
};

export default PaymentShippingInfo;
