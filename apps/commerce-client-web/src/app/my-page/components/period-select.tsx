'use client';

import { useCallback, useState } from 'react';
import ButtonRadioGroup from '@/app/my-page/components/button-radio-group';

const periodOptions = [
  { value: 'last-week', label: '최근 일주일' },
  { value: 'last-month', label: '1개월' },
  { value: 'last-three-months', label: '3개월' },
  { value: 'last-six-months', label: '6개월' },
];

export default function PeriodSelect() {
  const [period, setPeriod] = useState('last-week');

  const handleChange = useCallback((value: string) => {
    setPeriod(value);
  }, []);

  return (
    <ButtonRadioGroup
      name="period"
      options={periodOptions}
      value={period}
      onChange={handleChange}
    />
  );
}
