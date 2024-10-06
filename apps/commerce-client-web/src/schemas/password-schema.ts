import { z } from 'zod';

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(6, '현재 비밀번호는 6자 이상이어야 합니다.'),
    newPassword: z.string().min(8, '새로운 비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(8, '새로운 비밀번호 재입력은 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'], // 오류가 발생한 필드를 명시
  });
