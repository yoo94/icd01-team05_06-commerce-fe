import { z } from 'zod';

export const UserInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요.'),
  phone: z.string().min(10, '올바른 전화번호를 입력하세요. [-하이픈 제외]'),
  email: z.string().email('유효한 이메일을 입력하세요.'),
});

export const ShippingInfoSchema = z.object({
  recipient: z.string().min(1, '수령인 이름을 입력하세요.'),
  phone: z.string().min(10, '올바른 전화번호를 입력하세요. [-하이픈 제외]'),
  address: z.string().min(1, '주소를 입력하세요.'),
  detailAddress: z.string().min(1, '상세 주소를 입력하세요.'),
  postalCode: z.string().min(1, '우편번호를 입력하세요.'),
  memo: z.string().optional(),
});

export const AgreementInfoSchema = z.object({
  termsOfService: z.literal(true, {
    errorMap: () => ({ message: '이용 약관에 동의해야 합니다.' }),
  }),
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: '개인정보 처리방침에 동의해야 합니다.' }),
  }),
  ageVerification: z.literal(true, {
    errorMap: () => ({ message: '연령 확인에 동의해야 합니다.' }),
  }),
});

export const PaymentSchema = z
  .object({
    depositorName: z.string().optional(),
    paymentMethod: z.enum(['BANK_TRANSFER', 'CREDIT_CARD'], {
      errorMap: () => ({ message: '결제 수단을 선택하세요.' }),
    }),
    bank: z.string().optional(),
    orderBooks: z
      .array(
        z.object({
          productId: z.number().positive('유효한 상품 ID를 입력하세요.'),
          quantity: z.number().min(1, '수량은 최소 1개 이상이어야 합니다.'),
        }),
      )
      .nonempty('주문할 상품을 선택하세요.'),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'BANK_TRANSFER') {
      if (!data.bank) {
        ctx.addIssue({
          code: 'custom',
          path: ['bankTransfer'],
          message: '무통장 입금 시 은행을 선택하세요.',
        });
      }
      if (!data.depositorName) {
        ctx.addIssue({
          code: 'custom',
          path: ['depositorName'],
          message: '무통장 입금 시 입금자명을 입력하세요.',
        });
      }
    }
  });
