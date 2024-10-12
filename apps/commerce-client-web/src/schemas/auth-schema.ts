import { z } from 'zod';

// Common schema components
const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요')
  .max(50, '이름은 최대 50자까지 입력 가능합니다')
  .regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다');

const phoneSchema = z
  .string()
  .regex(/^\d+$/, '전화번호는 숫자만 입력 가능합니다')
  .min(10, '전화번호는 최소 10자 이상이어야 합니다')
  .max(11, '전화번호는 최대 11자까지 입력 가능합니다');

const postalCodeSchema = z
  .string()
  .regex(/^\d+$/, '우편번호는 숫자만 입력 가능합니다')
  .min(1, '우편번호를 입력해주세요')
  .max(10, '우편번호는 최대 10자까지 입력 가능합니다');

const streetAddressSchema = z
  .string()
  .min(1, '기본 주소를 입력해주세요')
  .max(100, '기본 주소는 최대 100자까지 입력 가능합니다');

const detailAddressSchema = z
  .string()
  .max(100, '상세 주소는 최대 100자까지 입력 가능합니다')
  .optional();

const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
  .max(20, '비밀번호는 최대 20자까지 입력 가능합니다')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/,
    '비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다',
  );

const confirmPasswordSchema = z.string().min(1, '비밀번호 확인을 입력해주세요');

// Common address object schema
const addressSchema = z.object({
  postalCode: postalCodeSchema,
  streetAddress: streetAddressSchema,
  detailAddress: detailAddressSchema,
});

// UserInfoSchema using the common components
export const UserInfoSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  password: z
    .string()
    .optional()
    .refine((value) => !value || passwordSchema.safeParse(value).success, {
      message: '비밀번호는 대소문자, 숫자, 특수문자를 포함하여 6자 이상이어야 합니다.',
    }),
  ...addressSchema.shape, // Spread address schema into UserInfoSchema
});

// SignupSchema using the common components
export const SignupSchema = z
  .object({
    name: nameSchema,
    email: z.string().min(1, '이메일을 입력해주세요').email('유효한 이메일 주소를 입력해주세요'),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    phone: phoneSchema,
    ...addressSchema.shape, // Spread address schema into SignupSchema
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다',
      });
    }
  });
