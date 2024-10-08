'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage } from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';
import { UserInfoFormData, useUserStore } from '@/stores/use-user-store';
import { UserInfoSchema } from '@/schemas/userinfo-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordDialog from './password-dialog';
import { UserInfo } from '@/types/auth-types';
import { updateUserInfo } from '@/app/actions/auth-action';
import PostAddressModal, { PostAddress } from '@/components/common/post-address-modal';

interface InputRowProps {
  label: string;
  name: keyof UserInfoFormData;
  placeholder?: string;
  type?: string;
  isSmall?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  errors?: string;
}

const UserInfoForm = ({ userInfo }: { userInfo: UserInfo }) => {
  const { userInfoData, setUserInfoData, clearUserInfoData } = useUserStore();
  const [isPostAddressModalOpen, setIsPostAddressModalOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false); // 비밀번호 변경 Dialog 상태

  const methods = useForm({
    resolver: zodResolver(UserInfoSchema), // Zod 스키마 연결
    defaultValues: userInfoData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;

  useEffect(() => {
    if (userInfo) {
      const updatedUserInfoData: UserInfoFormData = {
        name: userInfo.name || '',
        phone: userInfo.phone || '',
        postalCode: userInfo.postalCode || '',
        streetAddress: userInfo.streetAddress || '',
        detailAddress: userInfo.detailAddress || '',
        password: '',
      };

      setUserInfoData(updatedUserInfoData); // Update Zustand store only on first load.
      reset(updatedUserInfoData); // Reset the form with fetched user data.
    }
  }, [userInfo, setUserInfoData, reset]);

  // 우편번호 및 주소 데이터 업데이트 함수
  const handleCompletePostcode = (data: PostAddress) => {
    const { zonecode, address } = data;

    setUserInfoData({
      postalCode: zonecode || '',
      streetAddress: address || '',
    });

    reset({
      ...userInfoData,
      postalCode: zonecode || '',
      streetAddress: address || '',
    });
  };

  const onSubmit = async (data: UserInfoFormData) => {
    try {
      const success = await updateUserInfo(data);

      if (success) {
        clearUserInfoData();
      }
    } catch (error) {
      console.error('Error during user info update:', error);
    }
  };

  const InputRow = ({
    label,
    name,
    placeholder,
    type = 'text',
    isSmall,
    disabled,
    onClick,
    errors,
  }: InputRowProps) => (
    <tr className="border-b">
      <td className="w-32 bg-gray-100 p-2 text-center text-xs">{label}</td>
      <td className="p-2">
        <FormControl>
          <div className="flex">
            <Input
              type={type}
              className={`text-sm ${isSmall ? 'w-40' : 'w-full'}`} // isSmall에 따라 클래스 변경
              placeholder={placeholder}
              {...methods.register(name)} // Let react-hook-form manage state internally.
              disabled={disabled}
            />
            {onClick && (
              <Button
                type="button"
                variant="secondary"
                className="ml-2 w-20 text-xs"
                onClick={onClick}
              >
                조회
              </Button>
            )}
          </div>
        </FormControl>
        {errors && <FormMessage className="mt-1 text-xs">{errors}</FormMessage>}
      </td>
    </tr>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <tbody className="text-left md:text-center lg:text-left">
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">아이디</td>
                <td className="p-4">
                  <span className="text-sm">{userInfo.email}</span>
                </td>
              </tr>
              <InputRow label="이름" name="name" isSmall disabled errors={errors.name?.message} />
              <InputRow
                label="전화번호"
                name="phone"
                placeholder="- 없이 입력해 주세요."
                isSmall
                errors={errors.phone?.message}
              />
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">비밀번호</td>
                <td className="p-2">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-xs"
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    비밀번호 변경
                  </Button>
                </td>
              </tr>
              <InputRow
                label="우편번호"
                name="postalCode"
                isSmall
                onClick={() => setIsPostAddressModalOpen(true)}
                errors={errors.postalCode?.message}
              />
              <InputRow label="주소" name="streetAddress" errors={errors.streetAddress?.message} />
              <InputRow
                label="상세 주소"
                name="detailAddress"
                errors={errors.detailAddress?.message}
              />
            </tbody>
          </table>
        </div>

        {/* Button aligned at the center for mobile and larger on wider screens */}
        <div className="mt-4 flex justify-center gap-2 md:justify-end">
          <Button className="w-full md:w-40" disabled={!isValid}>
            수정
          </Button>
        </div>
      </form>

      <PostAddressModal
        isOpen={isPostAddressModalOpen}
        onClose={() => setIsPostAddressModalOpen(false)}
        onComplete={handleCompletePostcode}
      />

      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      />
    </FormProvider>
  );
};

export default UserInfoForm;
