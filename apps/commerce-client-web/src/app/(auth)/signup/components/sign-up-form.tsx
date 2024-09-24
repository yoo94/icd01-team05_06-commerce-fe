'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import useAuthStore, { SignupFormData } from '@/stores/use-auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/schemas/signup-schema';

interface SignUpFormProps {
  onSubmit: (values: SignupFormData) => void;
  onValidChange: (isValid: boolean) => void;
}

const SignUpForm = ({ onSubmit, onValidChange }: SignUpFormProps) => {
  const { signupData, setSignupData } = useAuthStore();

  const methods = useForm({
    resolver: zodResolver(SignupSchema), // Zod 스키마 연결
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
        <FormItem>
          <FormLabel htmlFor="name">이름</FormLabel>
          <FormControl>
            <Input
              type="text"
              id="name"
              placeholder="이름을 입력해 주세요."
              {...methods.register('name', {
                onChange: (e) => handleInputChange('name', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.name?.message}</FormMessage>
        </FormItem>

        {/* 이메일 입력 필드 */}
        <FormItem>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <FormControl>
            <Input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요."
              {...methods.register('email', {
                onChange: (e) => handleInputChange('email', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.email?.message}</FormMessage>
        </FormItem>

        {/* 비밀번호 입력 필드 */}
        <FormItem>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <FormControl>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요."
              {...methods.register('password', {
                onChange: (e) => handleInputChange('password', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.password?.message}</FormMessage>
        </FormItem>

        {/* 비밀번호 확인 필드 */}
        <FormItem>
          <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
          <FormControl>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력해 주세요."
              {...methods.register('confirmPassword', {
                onChange: (e) => handleInputChange('confirmPassword', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.confirmPassword?.message}</FormMessage>
        </FormItem>

        {/* 전화번호 입력 필드 */}
        <FormItem>
          <FormLabel>전화번호</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="숫자로 입력해주세요. ex) 01012345678"
              {...methods.register('phone', {
                onChange: (e) => handleInputChange('phone', e.target.value.replace(/\D/g, '')),
              })}
              maxLength={11} // 최대 11자리로 제한 (예: 01012345678)
              className="w-full rounded border p-2 text-sm"
            />
          </FormControl>
          <FormMessage>{errors.phone?.message}</FormMessage>
        </FormItem>

        {/* 우편번호 입력 필드 */}
        <FormItem>
          <FormLabel htmlFor="postalCode">우편번호</FormLabel>
          <FormControl>
            <div className="flex">
              <Input
                type="text"
                id="postalCode"
                placeholder="우편번호를 입력해 주세요."
                {...methods.register('postalCode', {
                  onChange: (e) => handleInputChange('postalCode', e.target.value),
                })}
                className="grow"
              />
              <Button
                type="button"
                variant="secondary"
                className="ml-2 w-32"
                onClick={() => alert('우편번호 조회')}
              >
                조회
              </Button>
            </div>
          </FormControl>
          <FormMessage>{errors.postalCode?.message}</FormMessage>
        </FormItem>

        {/* 기본 주소 입력 필드 */}
        <FormItem>
          <FormLabel htmlFor="address">기본 주소</FormLabel>
          <FormControl>
            <Input
              type="text"
              id="address"
              placeholder="기본 주소를 입력해 주세요."
              {...methods.register('address', {
                onChange: (e) => handleInputChange('address', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.address?.message}</FormMessage>
        </FormItem>

        {/* 상세 주소 입력 필드 */}
        <FormItem>
          <FormLabel htmlFor="addressDetail">상세 주소</FormLabel>
          <FormControl>
            <Input
              type="text"
              id="addressDetail"
              placeholder="상세 주소를 입력해 주세요."
              {...methods.register('addressDetail', {
                onChange: (e) => handleInputChange('addressDetail', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage>{errors.addressDetail?.message}</FormMessage>
        </FormItem>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
