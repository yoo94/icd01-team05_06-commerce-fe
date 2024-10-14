'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormMessage } from '@/components/ui/form';
import { verifyPassword } from '@/app/actions/auth-action'; // Import API for password verification
import { AuthToken } from '@/types/auth-types';

interface PasswordConfirmationFormProps {
  onPasswordVerified: (token: AuthToken) => void;
}

const PasswordConfirmationForm = ({ onPasswordVerified }: PasswordConfirmationFormProps) => {
  const methods = useForm<{ password: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const onSubmit = async (data: { password: string }) => {
    try {
      const token = await verifyPassword(data.password);
      if (token) {
        onPasswordVerified(token);
      } else {
        setError('password', { type: 'manual', message: 'Invalid password.' });
      }
    } catch (err) {
      console.error('Error verifying password:', err);
      setError('password', { type: 'manual', message: 'Error verifying password.' });
    }
  };

  return (
    <div className="flex h-96 items-center justify-center rounded-lg border">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-64 flex-col gap-4">
          <FormControl>
            <div>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                className="text-xs"
                {...register('password', { required: '비밀번호를 입력해야 합니다.' })}
              />
              {errors.password && (
                <FormMessage className="mt-2 text-xs">{errors.password.message}</FormMessage>
              )}
            </div>
          </FormControl>
          <Button type="submit" disabled={isSubmitting} className="text-sm">
            {isSubmitting ? '확인 중...' : '비밀번호 확인'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PasswordConfirmationForm;
