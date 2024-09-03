'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import useAuthStore from '@/stores/useAuthStore'; // zustand 스토어 가져오기

interface UserInfoFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
  address: string;
  addressDetail: string;
}

interface UserInfoFormProps {
  onSubmit: (values: UserInfoFormValues) => void;
  onValidChange: (isValid: boolean) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, onValidChange }) => {
  const { signupData, setSignupData } = useAuthStore();

  const methods = useForm({
    defaultValues: signupData,
    mode: 'onChange',
  });

  const { handleSubmit, formState } = methods;

  // 유효성 검사 상태를 상위 컴포넌트에 전달
  useEffect(() => {
    onValidChange(formState.isValid);
  }, [formState.isValid, onValidChange]);

  // 입력 필드가 변경될 때 zustand 상태 업데이트
  const handleInputChange = (name: keyof typeof signupData, value: string) => {
    setSignupData({ [name]: value });
  };

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
                required: '이름을 입력해주세요',
                onChange: (e) => handleInputChange('name', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
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
                required: '이메일을 입력해주세요',
                onChange: (e) => handleInputChange('email', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
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
                required: '비밀번호를 입력해주세요',
                onChange: (e) => handleInputChange('password', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
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
                required: '비밀번호 확인을 입력해주세요',
                onChange: (e) => handleInputChange('confirmPassword', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
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
                  required: '우편번호를 입력해주세요',
                  onChange: (e) => handleInputChange('postalCode', e.target.value),
                })}
                className="grow"
              />
              <Button
                type="button"
                variant="secondary"
                className="ml-2"
                onClick={() => alert('우편번호 조회')}
              >
                조회
              </Button>
            </div>
          </FormControl>
          <FormMessage />
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
                required: '기본 주소를 입력해주세요',
                onChange: (e) => handleInputChange('address', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
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
                required: '상세 주소를 입력해주세요',
                onChange: (e) => handleInputChange('addressDetail', e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </form>
    </FormProvider>
  );
};

export default UserInfoForm;
