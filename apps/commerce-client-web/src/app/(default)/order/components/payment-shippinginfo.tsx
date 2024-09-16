'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/common/modal';
import DaumPostcode from 'react-daum-postcode';

interface OrderType {
  name: string;
  phnum: string;
  address: string;
  detailAddress: string;
  memo: string;
  zonecode: string;
}

interface PaymentShippingInfoProps {
  order: OrderType;
  onOrderChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface PaymentPostAddressModalProps {
  zonecode: string;
  address: string;
}

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

const PaymentShippingInfo = ({ order, onOrderChange }: PaymentShippingInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Label>주소</Label>
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
      <PaymentPostAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleCompletePostcode}
      />
    </Card>
  );
};

export default PaymentShippingInfo;
