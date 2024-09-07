'use client';

import { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function DatePicker() {
  const [date, setDate] = useState(new Date());

  const handleSelect = useCallback((value: Date | undefined) => {
    if (value) setDate(value);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[160px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {format(date, 'yyyy.MM.dd')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
