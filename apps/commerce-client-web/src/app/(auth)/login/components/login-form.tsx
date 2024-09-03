'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { reset } = methods;

  const handleFinish = useCallback(
    async (value: LoginFormValues) => {
      setIsLoading(true);

      try {
        console.log(value);
        const result = await signIn('credentials', {
          redirect: false,
          email: value.email,
          password: value.password,
        });

        if (result?.error) {
          console.error('Error during login:', result.error);
          if (result.status === 401) {
            setShowAlertDialog(true); // Show AlertDialog if 401 status
          }
          reset(); // Reset form fields after a failed login attempt
          setIsLoading(false);
        } else {
          router.push('/'); // Redirect to the desired page on success
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setIsLoading(false);
        reset(); // Reset form fields in case of an unexpected error
      }
    },
    [router, reset], // Add reset to the dependency array
  );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFinish)} className="mt-4 flex flex-col gap-y-4">
          <FormItem>
            <FormControl>
              <Input
                type="email"
                placeholder="아이디를 입력해 주세요."
                {...methods.register('email', { required: '이메일을 입력해주세요' })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormControl>
              <Input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                {...methods.register('password', { required: '비밀번호를 입력해주세요' })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Checkbox name="saveId" className="border-slate-300" />
              <label htmlFor="formSaveId" className="text-sm">
                아이디 저장
              </label>
            </div>
            <div className="text-right text-sm">
              <Link href="#" className="text-slate-400 hover:underline">
                아이디 찾기
              </Link>
              <span className="mx-2 text-slate-200">|</span>
              <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
                <DialogTrigger asChild>
                  <Link href="#" className="text-slate-400 hover:underline">
                    비밀번호 찾기
                  </Link>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>비밀번호 찾기</DialogTitle>
                  </DialogHeader>
                  <p>🔑 임시 로그인 정보는 admin / admin 입니다.</p>
                  <Button onClick={() => setShowPasswordModal(false)}>닫기</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full text-base"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </FormProvider>

      {/* AlertDialog for 401 status */}
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인 실패</AlertDialogTitle>
            <AlertDialogDescription>
              이메일 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlertDialog(false)}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
