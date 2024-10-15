import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  errors?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
}

export const InputField = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  maxLength,
  errors,
  disabled,
  register,
}: InputFieldProps<T>) => (
  <FormItem className="w-full">
    {label && <FormLabel htmlFor={name as string}>{label}</FormLabel>}
    <FormControl>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className="text-xs"
      />
    </FormControl>
    {errors && <FormMessage className="mt-1 text-xs">{errors}</FormMessage>}
  </FormItem>
);
