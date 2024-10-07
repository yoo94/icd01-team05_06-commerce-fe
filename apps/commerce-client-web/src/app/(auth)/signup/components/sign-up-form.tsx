'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import useAuthStore, { SignupFormData } from '@/stores/use-auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/schemas/signup-schema';

// InputField 컴포넌트 정의
interface InputFieldProps {
  name: keyof SignupFormData;
  label: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  onClick?: () => void;
  errors?: string;
  handleInputChange: (name: keyof SignupFormData, value: string) => void;
}

const InputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  maxLength,
  onClick,
  errors,
  handleInputChange,
}: InputFieldProps) => (
  <FormItem>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <FormControl>
      <div className="flex">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => handleInputChange(name, e.target.value)}
          className={onClick ? 'grow' : ''}
        />
        {onClick && (
          <Button type="button" variant="secondary" className="ml-2 w-32" onClick={onClick}>
            조회
          </Button>
        )}
      </div>
    </FormControl>
    {errors && <FormMessage>{errors}</FormMessage>}
  </FormItem>
);

interface SignUpFormProps {
  onSubmit: (values: SignupFormData) => void;
  onValidChange: (isValid: boolean) => void;
}

const SignUpForm = ({ onSubmit, onValidChange }: SignUpFormProps) => {
  const { signupData, setSignupData } = useAuthStore();

  const methods = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: signupData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  // 입력 필드가 변경될 때 zustand 상태 업데이트
  const handleInputChange = (name: keyof typeof signupData, value: string) => {
    setSignupData({ [name]: value });
  };

  // 유효성 검사 상태를 상위 컴포넌트에 전달
  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
        {/* 이름 입력 필드 */}
        <InputField
          name="name"
          label="이름"
          type="text"
          placeholder="이름을 입력해 주세요."
          errors={errors.name?.message}
          handleInputChange={handleInputChange}
        />

        {/* 이메일 입력 필드 */}
        <InputField
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요."
          errors={errors.email?.message}
          handleInputChange={handleInputChange}
        />

        {/* 비밀번호 입력 필드 */}
        <InputField
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          errors={errors.password?.message}
          handleInputChange={handleInputChange}
        />

        {/* 비밀번호 확인 필드 */}
        <InputField
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요."
          errors={errors.confirmPassword?.message}
          handleInputChange={handleInputChange}
        />

        {/* 전화번호 입력 필드 */}
        <InputField
          name="phone"
          label="전화번호"
          type="text"
          placeholder="숫자로 입력해주세요. ex) 01012345678"
          maxLength={11}
          errors={errors.phone?.message}
          handleInputChange={(name, value) => handleInputChange(name, value.replace(/\D/g, ''))}
        />

        {/* 우편번호 입력 필드 */}
        <InputField
          name="postalCode"
          label="우편번호"
          type="text"
          placeholder="우편번호를 입력해 주세요."
          errors={errors.postalCode?.message}
          handleInputChange={handleInputChange}
          onClick={() => alert('우편번호 조회')}
        />

        {/* 기본 주소 입력 필드 */}
        <InputField
          name="streetAddress"
          label="기본 주소"
          type="text"
          placeholder="기본 주소를 입력해 주세요."
          errors={errors.streetAddress?.message}
          handleInputChange={handleInputChange}
        />

        {/* 상세 주소 입력 필드 */}
        <InputField
          name="detailAddress"
          label="상세 주소"
          type="text"
          placeholder="상세 주소를 입력해 주세요."
          errors={errors.detailAddress?.message}
          handleInputChange={handleInputChange}
        />
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
