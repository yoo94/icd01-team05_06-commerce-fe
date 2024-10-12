'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { UserInfoFormData, useUserStore } from '@/stores/use-user-store';
import { UserInfoSchema } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteUserAccount, updateUserInfo } from '@/app/actions/auth-action';
import PostAddressModal, { PostAddress } from '@/components/common/post-address-modal';
import { InputField } from '@/components/common/input-field'; // Use the InputField component
import { InfoIcon } from 'lucide-react';
import DeleteAccountDialog from './delete-account-dialog';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/use-auth-store';

const UserInfoForm = () => {
  const router = useRouter();
  const { userSession, userInfoData, setUserInfoData, authToken, clearAuthToken } = useUserStore();
  const [isPostAddressModalOpen, setIsPostAddressModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const methods = useForm<UserInfoFormData>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: userInfoData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
    reset,
  } = methods;

  useEffect(() => {
    if (userInfoData) {
      reset(userInfoData); // Populate form with Zustand store data
    }
  }, [userInfoData, reset]);

  // Handle postcode completion from modal
  const handleCompletePostcode = (data: PostAddress) => {
    const { zonecode, address } = data;

    const updatedData = {
      ...userInfoData,
      postalCode: zonecode || '',
      streetAddress: address || '',
    };

    setUserInfoData(updatedData);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      useUserStore.getState().reset();
      useAuthStore.getState().reset();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = async (data: UserInfoFormData) => {
    if (!authToken) {
      console.error('No authentication token available');
      return;
    }

    try {
      const { password, ...rest } = data;
      const userInfoToUpdate = password ? data : rest;

      const success = await updateUserInfo(userInfoToUpdate, authToken);

      if (success) {
        setUserInfoData(userInfoToUpdate);
        reset(userInfoToUpdate); // Reset with updated info
      }
    } catch (error) {
      console.error('Error during user info update:', error);
      // Set authToken to null in case of error
      clearAuthToken();
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
        {/* Table for User Info */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <tbody className="text-left md:text-center lg:text-left">
              {/* User ID */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">아이디</td>
                <td className="p-4 text-sm">{userSession?.email}</td>
              </tr>

              {/* Name Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">이름</td>
                <td className="p-2">
                  <div className="w-48">
                    <InputField
                      name="name"
                      type="text"
                      disabled
                      placeholder="이름을 입력해 주세요."
                      errors={errors.name?.message}
                      register={register} // Pass the register function
                    />
                  </div>
                </td>
              </tr>

              {/* Phone Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">전화번호</td>
                <td className="p-2">
                  <div className="w-48">
                    <InputField
                      name="phone"
                      type="tel"
                      placeholder="- 없이 입력해 주세요."
                      errors={errors.phone?.message}
                      register={register} // Pass the register function
                    />
                  </div>
                </td>
              </tr>

              {/* Password Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">비밀번호</td>
                <td className="p-2">
                  <InputField
                    name="password"
                    type="password"
                    placeholder="새로운 비밀번호를 입력하세요."
                    errors={errors.password?.message}
                    register={register} // Pass the register function
                  />
                  <div className="mt-1.5 flex items-center gap-x-0.5 text-xs text-slate-500">
                    <InfoIcon className="size-3" /> 비밀번호는 대소문자, 숫자, 특수문자를 포함하여
                    6자 이상이어야 합니다.
                  </div>
                </td>
              </tr>

              {/* Postal Code Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">우편번호</td>
                <td className="p-2">
                  <div className="flex items-end">
                    <InputField
                      name="postalCode"
                      type="number"
                      placeholder="우편번호를 입력해 주세요."
                      errors={errors.postalCode?.message}
                      register={register} // Pass the register function
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="ml-2 w-20 text-xs"
                      onClick={() => setIsPostAddressModalOpen(true)}
                    >
                      조회
                    </Button>
                  </div>
                </td>
              </tr>

              {/* Street Address Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">주소</td>
                <td className="p-2">
                  <InputField
                    name="streetAddress"
                    type="text"
                    placeholder="주소를 입력해 주세요."
                    errors={errors.streetAddress?.message}
                    register={register} // Pass the register function
                  />
                </td>
              </tr>

              {/* Detail Address Input */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">상세 주소</td>
                <td className="p-2">
                  <InputField
                    name="detailAddress"
                    type="text"
                    placeholder="상세 주소를 입력해 주세요."
                    errors={errors.detailAddress?.message}
                    register={register} // Pass the register function
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-center gap-2 md:justify-end">
          <Button type="submit" className="w-full md:w-40" disabled={!isDirty || !isValid}>
            수정
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-slate-500 md:w-40"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            회원탈퇴
          </Button>
        </div>
      </form>

      {/* Account Deletion Dialog */}
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />

      <PostAddressModal
        isOpen={isPostAddressModalOpen}
        onClose={() => setIsPostAddressModalOpen(false)}
        onComplete={handleCompletePostcode}
      />
    </FormProvider>
  );
};

export default UserInfoForm;
