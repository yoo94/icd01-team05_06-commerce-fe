'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/common/modal';
import DaumPostcode from 'react-daum-postcode';
import { useUserStore } from '@/stores/use-user-store';
import { getUserInfo } from '@/app/actions/auth-action'; // 사용자 정보를 가져오기 위한 Store

interface PaymentPostAddressModalProps {
  zonecode?: string;
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

const PaymentShippingInfo = () => {
  const { userInfoData } = useUserStore();
  const [order, setOrder] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    memo: '',
    zonecode: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 주문자 정보 변경 핸들러
  const onOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  // 주문자 정보와 동일 체크박스 핸들러
  const handleSameAsOrderer = (checked: boolean) => {
    if (checked && userInfoData) {
      const fetchUserInfo = async () => {
        try {
          const fetchedUserInfo = await getUserInfo();
          setOrder({
            ...order,
            name: fetchedUserInfo.name,
            phone: fetchedUserInfo.phone,
          });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    } else {
      setOrder({
        ...order,
        name: '',
        phone: '',
        detailAddress: '',
      });
    }
  };

  // 우편번호 및 주소 데이터 업데이트 함수
  const handleCompletePostcode = (data: PaymentPostAddressModalProps) => {
    const { zonecode, address } = data;

    onOrderChange({
      target: {
        name: 'zonecode',
        value: zonecode || '',
      },
    } as React.ChangeEvent<HTMLInputElement>);

    onOrderChange({
      target: {
        name: 'address',
        value: address || '',
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
          <Checkbox id="sameAsOrderer" onCheckedChange={handleSameAsOrderer} />
          <Label htmlFor="sameAsOrderer" className="ml-2">
            회원 정보와 동일
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
              type="tel"
              placeholder="연락처"
              name="phone"
              value={order.phone}
              onChange={onOrderChange}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">우편번호</Label>
            <Input
              className="cursor-pointer"
              type="text"
              placeholder="우편번호"
              name="zonecode"
              value={order.zonecode}
              readOnly={true}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-500">주소</Label>
            <Input
              type="text"
              placeholder="주소"
              name="address"
              value={order.address}
              readOnly={true}
              onChange={onOrderChange}
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
