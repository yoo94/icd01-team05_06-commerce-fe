'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/common/modal';
import DaumPostcode from 'react-daum-postcode';

interface PaymentPostAddressModalProps {
  zonecode?: string;
  address: string;
}
const mockOrder = {
  name: '패스트파이브',
  phnum: '01024129368',
  address: '서울',
  detailAddress: '강남구',
  memo: '놓고 가주세여',
  zonecode: '',
};
const PaymentPostAddressModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: PaymentPostAddressModalProps) => void;
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <DaumPostcode
        onComplete={(data) => {
          onComplete(data);
          onClose();
        }}
      />
    </Modal>
  );
};

const PaymentShippingInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(mockOrder);
  const onOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };
  // 우편번호 및 주소 데이터 업데이트 함수
  const handleCompletePostcode = (data: PaymentPostAddressModalProps) => {
    const { zonecode, address } = data;

    // 우편번호와 주소를 각각 필드에 업데이트
    onOrderChange({
      target: {
        name: 'zonecode',
        value: zonecode,
      },
    } as React.ChangeEvent<HTMLInputElement>);

    onOrderChange({
      target: {
        name: 'address',
        value: address,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">배송 정보</CardTitle>
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
            <Label className="mb-1 block text-xs text-slate-500">수령인</Label>
            <Input
              type="text"
              placeholder="수령인"
              name="name"
              value={order.name}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">연락처</Label>
            <Input
              type="text"
              placeholder="연락처"
              name="phnum"
              value={order.phnum}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">우편번호</Label>
            <Input
              className="cursor-pointer"
              type="text"
              placeholder="우편번호"
              name="zonecode" // 우편번호 필드
              value={order.zonecode} // 우편번호 값 반영
              readOnly={true}
              onClick={() => setIsModalOpen(true)} // 클릭 시 모달 열기
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">주소</Label>
            <Input
              type="text"
              placeholder="주소"
              name="address"
              value={order.address} // 주소 값 반영
              onChange={onOrderChange}
              readOnly={true}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">상세주소</Label>
            <Input
              type="text"
              placeholder="상세주소"
              name="detailAddress"
              value={order.detailAddress}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">배송 메모</Label>
            <Textarea
              placeholder="배송 메모를 입력하세요."
              name="memo"
              value={order.memo}
              onChange={onOrderChange}
            />
          </div>
        </div>
      </CardContent>
      <PaymentPostAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleCompletePostcode}
      />
    </Card>
  );
};

export default PaymentShippingInfo;
