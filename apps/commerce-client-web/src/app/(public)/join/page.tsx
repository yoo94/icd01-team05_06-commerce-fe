'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import StepIndicator from './component/step-indicator';
import TermsAgreement from './component/terms-agreement';
import UserInfoForm from './component/use-info-form';
import CompletionStep from './component/completion-step';

const steps = ['약관동의', '정보입력', '가입완료'];

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    postalCode: '',
    address: '',
    addressDetail: '',
  });
  const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);

  const handleStepClick = (index: number) => setStep(index);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) =>
      setter(checked);

  const isStep1Complete = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.postalCode &&
      formData.address &&
      formData.addressDetail &&
      formData.password === formData.confirmPassword
    );
  };

  const handlePrevStep = () => step > 0 && setStep(step - 1);
  const handleNextStep = (e: React.FormEvent) => {
    if (step === 0 && isAgreedPrivacy && isAgreedTerms) {
      setStep(step + 1);
    } else if (step === 1 && isStep1Complete()) {
      handleSubmit(e);
      setStep(step + 1);
    } else {
      alert(step === 0 ? '약관에 동의해 주세요.' : '모든 필드를 올바르게 입력해 주세요.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${formData.address} ${formData.addressDetail}`;
    const submitData = { ...formData, address: fullAddress };
    // TODO: 서버로 데이터 전송 (예: fetch API 사용)
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <StepIndicator steps={steps} currentStep={step} onStepClick={handleStepClick} />
      {step === 0 && (
        <TermsAgreement
          isAgreedPrivacy={isAgreedPrivacy}
          isAgreedTerms={isAgreedTerms}
          onPrivacyChange={handleCheckboxChange(setIsAgreedPrivacy)}
          onTermsChange={handleCheckboxChange(setIsAgreedTerms)}
        />
      )}
      {step === 1 && <UserInfoForm formData={formData} onChange={handleInputChange} />}
      {step === 2 && <CompletionStep userName={formData.name} />}
      <div className="flex justify-between mt-8 gap-x-4">
        {step < 2 ? (
          <>
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 0}
              size="lg"
              className="text-base flex-1"
            >
              이전
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                (step === 0 && (!isAgreedPrivacy || !isAgreedTerms)) ||
                (step === 1 && !isStep1Complete())
              }
              size="lg"
              className="text-base flex-1"
            >
              다음
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            className="text-base w-full"
            onClick={() => (window.location.href = '/')}
          >
            홈으로 이동
          </Button>
        )}
      </div>
    </div>
  );
}
