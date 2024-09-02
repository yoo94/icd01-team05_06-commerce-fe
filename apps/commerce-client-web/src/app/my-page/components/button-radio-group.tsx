'use client';

import React, { ChangeEvent, useCallback } from 'react';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  value: string;
  onChange?: (value: string) => void;
}

const ButtonRadioGroup: React.FC<Props> = ({ name, options, value, onChange }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="flex gap-px overflow-hidden rounded-md border bg-gray-100">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={option.value}
            className="peer sr-only"
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          <Label
            htmlFor={option.value}
            className="flex w-24 cursor-pointer items-center justify-center px-3 py-2 text-sm hover:bg-gray-50 peer-checked:bg-white"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default ButtonRadioGroup;
