import { z } from 'zod';

export const UserInfoSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(50, '이름은 최대 50자까지 입력 가능합니다')
    .regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다'),

  phone: z
    .string()
    .regex(/^\d+$/, '전화번호는 숫자만 입력 가능합니다')
    .min(10, '전화번호는 최소 10자 이상이어야 합니다')
    .max(11, '전화번호는 최대 11자까지 입력 가능합니다'),

  postalCode: z
    .string()
    .regex(/^\d+$/, '우편번호는 숫자만 입력 가능합니다')
    .min(1, '우편번호를 입력해주세요')
    .max(10, '우편번호는 최대 10자까지 입력 가능합니다'),

  streetAddress: z
    .string()
    .min(1, '기본 주소를 입력해주세요')
    .max(100, '기본 주소는 최대 100자까지 입력 가능합니다'),

  detailAddress: z.string().max(100, '상세 주소는 최대 100자까지 입력 가능합니다').optional(),
});
