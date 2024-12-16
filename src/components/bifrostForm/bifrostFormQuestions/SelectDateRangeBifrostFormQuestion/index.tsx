import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableSelectDateRangeBifrostFormQuestion } from "@kismet_ai/foundation";
import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { DateRange } from "react-day-picker";
import { PendingCalendarDateRange } from "@kismet_ai/foundation";
import {
  CalendarDate,
  convertLocalCalendarDateToNativeDate,
  convertNativeDateToLocalCalendarDate,
} from "@kismet_ai/foundation";

export interface SelectDateRangeBifrostFormQuestionProps {
  renderableSelectDateRangeBifrostFormQuestion: RenderableSelectDateRangeBifrostFormQuestion;
  calendarDateRange: PendingCalendarDateRange;
  setCalendarDateRange: ({
    updatedCalendarDateRange,
  }: {
    updatedCalendarDateRange: PendingCalendarDateRange;
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

export function SelectDateRangeBifrostFormQuestion({
  renderableSelectDateRangeBifrostFormQuestion,
  calendarDateRange,
  setCalendarDateRange,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: SelectDateRangeBifrostFormQuestionProps) {
  const inputId: string = `SelectDateRangeBifrostFormQuestion_${renderableSelectDateRangeBifrostFormQuestion.bifrostFormQuestionId}`;

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
    if (
      !renderableSelectDateRangeBifrostFormQuestion.required &&
      pendingCalendarDateRange.startCalendarDate === undefined &&
      pendingCalendarDateRange.endCalendarDate === undefined
    ) {
      return true;
    }

    return (
      pendingCalendarDateRange.startCalendarDate !== undefined &&
      pendingCalendarDateRange.endCalendarDate !== undefined
    );
  };

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: isCalendarDateRangeValid({
        pendingCalendarDateRange: calendarDateRange,
      }),
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: isCalendarDateRangeEntered({
        pendingCalendarDateRange: calendarDateRange,
      }),
    });

    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [calendarDateRange, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const onChangeCalendarDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange) return;

    const updatedStartCalendarDate: CalendarDate | undefined = dateRange.from
      ? convertNativeDateToLocalCalendarDate(dateRange.from)
      : calendarDateRange.startCalendarDate;

    const updatedEndCalendarDate: CalendarDate | undefined = dateRange.to
      ? convertNativeDateToLocalCalendarDate(dateRange.to)
      : calendarDateRange.endCalendarDate;

    setCalendarDateRange({
      updatedCalendarDateRange: {
        startCalendarDate: updatedStartCalendarDate,
        endCalendarDate: updatedEndCalendarDate,
      },
    });

    setIsResponseValid({
      isResponseValid: isCalendarDateRangeValid({
        pendingCalendarDateRange: calendarDateRange,
      }),
    });
  };

  return (
    <FormField>
      <DateRangePicker
        dateRange={{
          from: calendarDateRange.startCalendarDate
            ? convertLocalCalendarDateToNativeDate(
                calendarDateRange.startCalendarDate
              )
            : undefined,
          to: calendarDateRange.endCalendarDate
            ? convertLocalCalendarDateToNativeDate(
                calendarDateRange.endCalendarDate
              )
            : undefined,
        }}
        setDateRange={onChangeCalendarDateRange}
      />

      <FormLabel htmlFor={inputId}>
        {renderableSelectDateRangeBifrostFormQuestion.label}
      </FormLabel>
    </FormField>
  );
}
