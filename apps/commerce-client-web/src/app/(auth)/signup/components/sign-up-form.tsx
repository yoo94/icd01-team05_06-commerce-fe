import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/schemas/auth-schema';
import PostAddressModal, { PostAddress } from '@/components/common/post-address-modal';
import { useAuthStore, SignupFormData } from '@/stores/use-auth-store';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { InputField } from '@/components/common/input-field';

interface SignUpFormProps {
  onSubmit: (values: SignupFormData) => void;
  onValidChange: (isValid: boolean) => void;
}

const SignUpForm = ({ onSubmit, onValidChange }: SignUpFormProps) => {
  const { signupData, setSignupData } = useAuthStore();
  const [isPostAddressModalOpen, setIsPostAddressModalOpen] = useState(false);

  // Initialize react-hook-form with zod resolver for validation
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema), // Link with your zod validation schema
    defaultValues: signupData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
  } = methods;

  const handleCompletePostcode = (data: PostAddress) => {
    const { zonecode, address } = data;

    // Use setValue from react-hook-form to update the form state
    methods.setValue('postalCode', zonecode || '');
    methods.setValue('streetAddress', address || '');

    // Optionally, trigger validation after setting values
    methods.trigger(['postalCode', 'streetAddress']);
  };

  // Pass validation state to the parent component
  useEffect(() => {
    onValidChange(isValid);
    setSignupData(methods.getValues());
  }, [isValid]);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-y-4">
          {/* Name Input */}
          <InputField
            name="name"
            label="이름"
            type="text"
            placeholder="이름을 입력해 주세요."
            errors={errors.name?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Email Input */}
          <InputField
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요."
            errors={errors.email?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Password Input */}
          <InputField
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            errors={errors.password?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Confirm Password Input */}
          <InputField
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
            errors={errors.confirmPassword?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Phone Input */}
          <InputField
            name="phone"
            label="전화번호"
            type="tel"
            placeholder="숫자로 입력해주세요. ex) 01012345678"
            maxLength={11}
            errors={errors.phone?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Postal Code Input */}
          <div className="flex items-end justify-between">
            <InputField
              name="postalCode"
              label="우편번호"
              type="number"
              placeholder="우편번호를 입력해 주세요."
              errors={errors.postalCode?.message}
              register={register} // Pass the register function to InputField
            />
            <Button
              type="button"
              variant="secondary"
              className="ml-2 w-32"
              onClick={() => setIsPostAddressModalOpen(true)}
            >
              조회
            </Button>
          </div>

          {/* Street Address Input */}
          <InputField
            name="streetAddress"
            label="기본 주소"
            type="text"
            placeholder="기본 주소를 입력해 주세요."
            errors={errors.streetAddress?.message}
            register={register} // Pass the register function to InputField
          />

          {/* Detail Address Input */}
          <InputField
            name="detailAddress"
            label="상세 주소"
            type="text"
            placeholder="상세 주소를 입력해 주세요."
            errors={errors.detailAddress?.message}
            register={register} // Pass the register function to InputField
          />
        </form>
      </FormProvider>

      <PostAddressModal
        isOpen={isPostAddressModalOpen}
        onClose={() => setIsPostAddressModalOpen(false)}
        onComplete={handleCompletePostcode}
      />
    </div>
  );
};

export default SignUpForm;
