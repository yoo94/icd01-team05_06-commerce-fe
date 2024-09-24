'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage } from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';
import { UserInfoFormValues, useUserStore } from '@/stores/use-user-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // 예시로 사용하는 Radio 컴포넌트

const UserInfoTableForm = () => {
  const { userInfoFormValues, setUserInfoFormValues } = useUserStore();
  const [isEditable, setIsEditable] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false); // 비밀번호 변경 Dialog 상태

  const methods = useForm({
    defaultValues: userInfoFormValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  // 비밀번호 변경 핸들러 (서버로 데이터 전송 가능)
  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 여기서 새로운 비밀번호 데이터를 처리하여 서버로 전송하는 로직 추가 가능
    console.log('비밀번호 변경 처리');
    setIsPasswordDialogOpen(false); // 다이얼로그 닫기
  };

  const onSubmit = (data: UserInfoFormValues) => {
    setUserInfoFormValues(data);
    setIsEditable(false); // 정보 수정 후 수정 모드 비활성화
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <tbody>
              {/* 아이디 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">아이디</td>
                <td className="p-2">
                  {' '}
                  <FormControl>
                    <Input
                      type="text"
                      className="text-xs"
                      {...methods.register('email')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                </td>
              </tr>

              {/* 닉네임 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">닉네임</td>
                <td className="p-2">
                  <FormControl>
                    <Input
                      type="text"
                      className="text-xs"
                      placeholder="20자 이내로 입력해 주세요."
                      {...methods.register('nickname')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage>{errors.nickname?.message}</FormMessage>
                </td>
              </tr>

              {/* 이름 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">이름</td>
                <td className="p-2">
                  {' '}
                  <FormControl>
                    <Input
                      type="text"
                      className="text-xs"
                      {...methods.register('name')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                </td>
              </tr>

              {/* 성별 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">성별</td>
                <td className="p-2">
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
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </td>
              </tr>

              {/* 닉네임 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">전화번호</td>
                <td className="p-2">
                  <FormControl>
                    <Input
                      type="text"
                      className="text-xs"
                      placeholder="- 없이 입력해 주세요."
                      {...methods.register('phone')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </td>
              </tr>

              {/* 생년월일 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">생년월일</td>
                <td className="p-2">
                  {' '}
                  <FormControl>
                    <Input
                      type="text"
                      className="text-xs"
                      {...methods.register('birthDate')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                </td>
              </tr>

              {/* 비밀번호 변경 */}
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

              {/* 우편번호 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">우편번호</td>
                <td className="flex items-center gap-2 p-2">
                  <FormControl>
                    <Input type="text" {...methods.register('postalCode')} disabled={!isEditable} />
                  </FormControl>
                  {isEditable && (
                    <Button size="sm" variant="secondary" className="text-xs">
                      주소찾기
                    </Button>
                  )}
                  <FormMessage>{errors.postalCode?.message}</FormMessage>
                </td>
              </tr>

              {/* 주소 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">주소</td>
                <td className="p-2">
                  <FormControl>
                    <Input type="text" {...methods.register('address')} disabled={!isEditable} />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </td>
              </tr>

              {/* 상세 주소 */}
              <tr className="border-b">
                <td className="w-32 bg-gray-100 p-2 text-center text-xs">상세 주소</td>
                <td className="p-2">
                  <FormControl>
                    <Input
                      type="text"
                      {...methods.register('addressDetail')}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage>{errors.addressDetail?.message}</FormMessage>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 수정/저장 버튼 */}
        <div className="mt-4 flex justify-end gap-2">
          {isEditable ? (
            <Button disabled={!isValid}>저장</Button>
          ) : (
            <Button onClick={() => setIsEditable(true)}>수정</Button>
          )}
        </div>
      </form>

      {/* 비밀번호 변경 다이얼로그 */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handlePasswordChange}>
            <FormControl>
              <Input type="password" placeholder="현재 비밀번호" />
            </FormControl>
            <FormControl>
              <Input type="password" placeholder="새로운 비밀번호" />
            </FormControl>
            <FormControl>
              <Input type="password" placeholder="새로운 비밀번호 재입력" />
            </FormControl>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsPasswordDialogOpen(false)}>
                취소
              </Button>
              <Button type="submit">변경</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default UserInfoTableForm;
