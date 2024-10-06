import { z } from 'zod';

export const UserInfoSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해 주세요.' }),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해 주세요.' })
    .max(20, { message: '닉네임은 20자 이내여야 합니다.' }),
  name: z.string().min(1, { message: '이름을 입력해 주세요.' }),
  gender: z.enum(['male', 'female'], { message: '성별을 선택해 주세요.' }),
  phone: z
    .string()
    .min(10, { message: '전화번호는 최소 10자리여야 합니다.' })
    .regex(/^\d+$/, { message: '전화번호는 숫자만 입력해 주세요.' }),
  birthDate: z.string().min(1, { message: '생년월일을 입력해 주세요.' }),
  postalCode: z.string().min(1, { message: '우편번호를 입력해 주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해 주세요.' }),
  addressDetail: z.string().min(1, { message: '상세 주소를 입력해 주세요.' }),
});
