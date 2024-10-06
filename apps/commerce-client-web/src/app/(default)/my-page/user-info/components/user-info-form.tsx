'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage } from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';
import { UserInfoFormValues, useUserStore } from '@/stores/use-user-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // 예시로 사용하는 Radio 컴포넌트
import { UserInfoSchema } from '@/schemas/userinfo-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordDialog from './password-dialog';

interface InputRowProps {
  label: string;
  name: keyof UserInfoFormValues;
  placeholder?: string;
  type?: string;
  isSmall?: boolean;
  disabled?: boolean;
  errors?: string;
}

const UserInfoTableForm = () => {
  const { userInfoFormValues, setUserInfoFormValues } = useUserStore();
  const [isEditable, setIsEditable] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false); // 비밀번호 변경 Dialog 상태

  const methods = useForm({
    resolver: zodResolver(UserInfoSchema), // Zod 스키마 연결
    defaultValues: userInfoFormValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data: UserInfoFormValues) => {
    setUserInfoFormValues(data);
    setIsEditable(false); // 정보 수정 후 수정 모드 비활성화
  };

  const InputRow = ({
    label,
    name,
    placeholder,
    type = 'text',
    isSmall,
    disabled,
    errors,
  }: InputRowProps) => (
    <tr className="border-b">
      <td className="w-32 bg-gray-100 p-2 text-center text-xs">{label}</td>
      <td className="p-2">
        <FormControl>
          <Input
            type={type}
            className={`text-xs ${isSmall ? 'w-40' : 'w-full'}`} // isSmall에 따라 클래스 변경
            placeholder={placeholder}
            {...methods.register(name)}
            disabled={disabled}
          />
        </FormControl>
        {errors && <FormMessage className="mt-1 text-xs">{errors}</FormMessage>}
      </td>
    </tr>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <tbody>
              <InputRow label="아이디" name="email" isSmall disabled />
              <InputRow
                label="닉네임"
                name="nickname"
                placeholder="20자 이내로 입력해 주세요."
                isSmall
                disabled={!isEditable}
                errors={errors.nickname?.message}
              />
              <InputRow label="이름" name="name" isSmall disabled />
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">성별</td>
                <td className="p-4">
                  <FormControl>
                    <RadioGroup
                      defaultValue={userInfoFormValues?.gender || ''}
                      {...methods.register('gender')}
                      disabled={!isEditable}
                      className="flex gap-4"
                    >
                      <RadioGroupItem value="male" id="male" />
                      <label htmlFor="male" className="text-xs">
                        남성
                      </label>
                      <RadioGroupItem value="female" id="female" />
                      <label htmlFor="female" className="text-xs">
                        여성
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs">{errors.gender?.message}</FormMessage>
                </td>
              </tr>
              <InputRow
                label="전화번호"
                name="phone"
                placeholder="- 없이 입력해 주세요."
                disabled={!isEditable}
                isSmall
                errors={errors.phone?.message}
              />
              <InputRow
                label="생년월일"
                name="birthDate"
                type="date"
                isSmall
                disabled={!isEditable}
              />
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">비밀번호</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs"
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    비밀번호 변경
                  </Button>
                </td>
              </tr>
              <InputRow label="우편번호" name="postalCode" isSmall disabled={!isEditable} />
              <InputRow label="주소" name="address" disabled={!isEditable} />
              <InputRow
                label="상세 주소"
                name="addressDetail"
                disabled={!isEditable}
                errors={errors.addressDetail?.message}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {isEditable ? (
            <Button disabled={!isValid}>저장</Button>
          ) : (
            <Button onClick={() => setIsEditable(true)}>수정</Button>
          )}
        </div>
      </form>

      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      />
    </FormProvider>
  );
};

export default UserInfoTableForm;
