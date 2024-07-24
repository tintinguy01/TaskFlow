'use client';

import React, { useEffect, useState } from 'react';
import { DateTimePicker } from '@/components/ui/datetime-picker';

const DatetimePickerCalendarSettings = ({ value, onChange }: { value: Date | undefined, onChange: (date: Date | undefined) => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  useEffect(() => {
    if (!value) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      onChange(currentDate);
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-10">
      <div className="space-y-2">
        <DateTimePicker weekStartsOn={1} value={selectedDate} onChange={(date) => {
          setSelectedDate(date);
          onChange(date);
        }} />
      </div>
    </div>
  );
};

export default DatetimePickerCalendarSettings;
