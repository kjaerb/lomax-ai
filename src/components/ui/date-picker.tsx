"use client";

import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react";
import { da } from "date-fns/locale";
import { useState } from "react";

export function DatePicker() {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <DateRangePicker
      className="max-w-md"
      value={value}
      onValueChange={setValue}
      locale={da}
      selectPlaceholder="Vælg"
      color="rose"
    >
      <DateRangePickerItem key="ytd" value="ytd" from={new Date()}>
        I dag
      </DateRangePickerItem>
      <DateRangePickerItem
        key="14"
        value="14"
        from={new Date(new Date().setDate(new Date().getDate() - 14))}
        to={new Date()}
      >
        14 Dage
      </DateRangePickerItem>
      <DateRangePickerItem
        key="1_month"
        value="1_month"
        from={new Date(new Date().setDate(new Date().getDate() - 30))}
        to={new Date()}
      >
        30 Dage
      </DateRangePickerItem>
    </DateRangePicker>
  );
}
