'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage } from '@/components/ui/form';
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

// 비밀번호 변경 다이얼로그 컴포넌트
interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordDialog = ({ isOpen, onClose }: PasswordDialogProps) => {
  const methods = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordSchema), // Zod 스키마 적용
    mode: 'onChange',
  });

  // 비밀번호 변경 핸들러 (서버로 데이터 전송 가능)
  const onSubmit = (data: PasswordFormValues) => {
    // TODO: 서버로 비밀번호 변경 요청
    console.log('비밀번호 변경 처리', data);
    onClose();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input type="password" placeholder="현재 비밀번호" {...register('currentPassword')} />
              <FormMessage className="mt-1 text-xs">{errors.currentPassword?.message}</FormMessage>
            </FormControl>
            <FormControl>
              <Input type="password" placeholder="새로운 비밀번호" {...register('newPassword')} />
              <FormMessage className="mt-1 text-xs">{errors.newPassword?.message}</FormMessage>
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="새로운 비밀번호 재입력"
                {...register('confirmPassword')}
              />
              <FormMessage className="mt-1 text-xs">{errors.confirmPassword?.message}</FormMessage>
            </FormControl>
            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">변경</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
