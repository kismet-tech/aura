import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import {
  CalendarDate,
  convertLocalCalendarDateToNativeDate,
  convertNativeDateToLocalCalendarDate,
  PendingCalendarDateRange,
} from "@kismet_ai/foundation";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";

interface MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePickerProps {
  value: PendingCalendarDateRange;
  setValue: ({
    updatedValue,
  }: {
    updatedValue: PendingCalendarDateRange | undefined;
  }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
  setHasQuestionBeenRespondedTo: ({
    hasQuestionBeenRespondedTo,
  }: {
    hasQuestionBeenRespondedTo: boolean;
  }) => void;
}

export function MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePickerProps) {
  const inputId: string = `MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker`;

  const isCalendarDateRangeEntered = ({
    pendingCalendarDateRange,
  }: {
    pendingCalendarDateRange: PendingCalendarDateRange;
  }): boolean => {
    return !!(
      pendingCalendarDateRange.startCalendarDate?.year &&
      pendingCalendarDateRange.startCalendarDate?.month &&
      pendingCalendarDateRange.startCalendarDate?.day &&
      pendingCalendarDateRange.endCalendarDate?.year &&
      pendingCalendarDateRange.endCalendarDate?.month &&
      pendingCalendarDateRange.endCalendarDate?.day
    );
  };

  const isCalendarDateRangeValid = ({
    pendingCalendarDateRange,
  }: {
    pendingCalendarDateRange: PendingCalendarDateRange;
  }): boolean => {
    return (
      !!pendingCalendarDateRange.startCalendarDate &&
      !!pendingCalendarDateRange.startCalendarDate.year &&
      !!pendingCalendarDateRange.startCalendarDate.month &&
      !!pendingCalendarDateRange.startCalendarDate.day &&
      !!pendingCalendarDateRange.endCalendarDate &&
      !!pendingCalendarDateRange.endCalendarDate.year &&
      !!pendingCalendarDateRange.endCalendarDate.month &&
      !!pendingCalendarDateRange.endCalendarDate.day
    );
  };

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: isCalendarDateRangeValid({
        pendingCalendarDateRange: value,
      }),
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: isCalendarDateRangeEntered({
        pendingCalendarDateRange: value,
      }),
    });

    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [value, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const onChangeCalendarDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange) return;

    const updatedStartCalendarDate: CalendarDate | undefined = dateRange.from
      ? convertNativeDateToLocalCalendarDate(dateRange.from)
      : value.startCalendarDate;

    const updatedEndCalendarDate: CalendarDate | undefined = dateRange.to
      ? convertNativeDateToLocalCalendarDate(dateRange.to)
      : value.endCalendarDate;

    setValue({
      updatedValue: {
        startCalendarDate: updatedStartCalendarDate,
        endCalendarDate: updatedEndCalendarDate,
      },
    });

    setIsResponseValid({
      isResponseValid: isCalendarDateRangeValid({
        pendingCalendarDateRange: value,
      }),
    });
  };

  return (
    <FormField>
      <DateRangePicker
        dateRange={{
          from: value.startCalendarDate
            ? convertLocalCalendarDateToNativeDate(value.startCalendarDate)
            : undefined,
          to: value.endCalendarDate
            ? convertLocalCalendarDateToNativeDate(value.endCalendarDate)
            : undefined,
        }}
        setDateRange={onChangeCalendarDateRange}
      />

      <FormLabel htmlFor={inputId}>Dates</FormLabel>
    </FormField>
  );
}
