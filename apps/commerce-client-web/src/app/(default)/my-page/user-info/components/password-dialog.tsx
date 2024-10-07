'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage, FormItem } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/schemas/password-schema';
import { PasswordFormData, useUserStore } from '@/stores/use-user-store';

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputFieldProps {
  name: keyof PasswordFormData;
  type: string;
  placeholder: string;
  errors?: string;
}

const PasswordDialog = ({ isOpen, onClose }: PasswordDialogProps) => {
  const { passwordData, setPasswordData } = useUserStore();

  const methods = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: passwordData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  // 비밀번호 변경 핸들러
  const onSubmit = (data: PasswordFormData) => {
    console.log('비밀번호 변경 처리', data);
    setPasswordData(data);
    onClose(); // 비밀번호 변경 후 다이얼로그 닫기
  };

  const InputField = ({ name, type, placeholder, errors }: InputFieldProps) => (
    <FormControl>
      <FormItem>
        <Input
          className="text-sm"
          type={type}
          placeholder={placeholder}
          {...methods.register(name)}
        />
        {errors && <FormMessage className="mt-1 text-xs">{errors}</FormMessage>}
      </FormItem>
    </FormControl>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="currentPassword"
              type="password"
              placeholder="현재 비밀번호"
              errors={errors.currentPassword?.message}
            />
            <InputField
              name="newPassword"
              type="password"
              placeholder="새로운 비밀번호"
              errors={errors.newPassword?.message}
            />
            <InputField
              name="confirmPassword"
              type="password"
              placeholder="새로운 비밀번호 재입력"
              errors={errors.confirmPassword?.message}
            />
            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>
                취소
              </Button>
              <Button disabled={!isValid} type="submit">
                변경
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
