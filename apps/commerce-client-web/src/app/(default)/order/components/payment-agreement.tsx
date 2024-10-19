'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePaymentStore } from '@/stores/use-payment-store';
import { createOrder } from '@/app/actions/order-action';
import { useWithLoadingAsync } from '@/components/common/with-loading-spinner';
import Modal from '@/components/common/modal';

const PaymentAgreement = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderedBooks, setOrderedBooks] = useState<{ title: string; quantity: number }[]>([]); // 주문한 책 정보 저장

  const {
    orderBooks,
    userInfo,
    shippingInfo,
    paymentMethod,
    depositorName,
    agreementInfo,
    setAgreementInfo,
  } = usePaymentStore((state) => state);

  const allAgreed = agreementInfo.termsOfService && agreementInfo.privacyPolicy;
  const isButtonDisabled = !allAgreed;

  const handleAgreeAll = (checked: boolean | string) => {
    const isChecked = checked === true;
    setAgreementInfo({
      termsOfService: isChecked,
      privacyPolicy: isChecked,
      ageVerification: true,
    });
  };

  const handleIndividualAgree = (
    type: 'termsOfService' | 'privacyPolicy',
    checked: boolean | string,
  ) => {
    const isChecked = checked === true;
    setAgreementInfo({ ...agreementInfo, [type]: isChecked });
  };

  const handleOrderCreation = async () => {
    const orderData = {
      products: orderBooks.map((book) => ({
        id: book.productId,
        quantity: book.quantity,
      })),
      ordererInfo: {
        name: userInfo.name,
        phoneNumber: userInfo.phone,
        email: userInfo.email,
      },
      deliveryInfo: {
        recipient: shippingInfo.recipient,
        phoneNumber: shippingInfo.phone,
        streetAddress: shippingInfo.address,
        detailAddress: shippingInfo.detailAddress,
        postalCode: shippingInfo.postalCode,
        memo: shippingInfo.memo,
      },
      paymentInfo: {
        method: paymentMethod,
        depositorName: depositorName,
      },
      agreementInfo,
    };
    return await createOrder(orderData);
  };

  const wrappedOrderCreation = useWithLoadingAsync(handleOrderCreation);

  const handlePayment = async () => {
    try {
      const response = await wrappedOrderCreation();
      if (response.orderStatus === 'COMPLETED') {
        setOrderNumber(response.orderNumber); // 주문 번호 저장
        setOrderedBooks(
          orderBooks.map((book) => ({
            title: book.title,
            quantity: book.quantity,
          })),
        ); // 주문한 책 정보 저장
        setIsModalOpen(true); // 모달 열기
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('주문 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/'); // 홈으로 이동
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

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <p className="mb-4 text-lg font-semibold">주문이 성공적으로 완료되었습니다!</p>
        {orderNumber && (
          <p className="mb-4">
            주문 번호: <strong>{orderNumber}</strong>
          </p>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">책 이름</th>
              <th className="border border-gray-300 px-4 py-2">수량</th>
            </tr>
          </thead>
          <tbody>
            {orderedBooks.map((book, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                <td className="border border-gray-300 px-4 py-2">{book.quantity}개</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </Card>
  );
};

export default PaymentAgreement;
