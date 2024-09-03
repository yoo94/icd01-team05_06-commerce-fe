'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import StepIndicator from './component/step-indicator';
import TermsAgreement from './component/terms-agreement';
import UserInfoForm from './component/use-info-form';
import CompletionStep from './component/completion-step';
import useAuthStore from '@/stores/useAuthStore'; // zustand 스토어 가져오기

const steps = ['약관동의', '정보입력', '가입완료'];

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const { signupData, submitSignup } = useAuthStore(); // zustand 스토어에서 상태 가져오기
  const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);

  const handleStepClick = (index: number) => setStep(index);

  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) =>
      setter(checked);

  const handleFormValidityChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid);
  }, []);

  const handlePrevStep = () => step > 0 && setStep(step - 1);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 0 && isAgreedPrivacy && isAgreedTerms) {
      setStep(step + 1);
    } else if (step === 1 && isFormValid) {
      await handleSubmit();
      setStep(step + 1);
    } else {
      alert(step === 0 ? '약관에 동의해 주세요.' : '모든 필드를 올바르게 입력해 주세요.');
    }
  };

  const handleSubmit = async () => {
    await submitSignup();
  };

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <StepIndicator steps={steps} currentStep={step} onStepClick={handleStepClick} />
      {step === 0 && (
        <TermsAgreement
          isAgreedPrivacy={isAgreedPrivacy}
          isAgreedTerms={isAgreedTerms}
          onPrivacyChange={handleCheckboxChange(setIsAgreedPrivacy)}
          onTermsChange={handleCheckboxChange(setIsAgreedTerms)}
        />
      )}
      {step === 1 && (
        <UserInfoForm onSubmit={handleSubmit} onValidChange={handleFormValidityChange} />
      )}
      {step === 2 && <CompletionStep userName={signupData.name} />}
      <div className="mt-8 flex justify-between gap-x-4">
        {step < 2 ? (
          <>
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 0}
              size="lg"
              className="flex-1 text-base"
            >
              이전
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                (step === 0 && (!isAgreedPrivacy || !isAgreedTerms)) || (step === 1 && !isFormValid)
              }
              size="lg"
              className="flex-1 text-base"
            >
              다음
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            className="w-full text-base"
            onClick={() => (window.location.href = '/')}
          >
            홈으로 이동
          </Button>
        )}
      </div>
    </div>
  );
}
