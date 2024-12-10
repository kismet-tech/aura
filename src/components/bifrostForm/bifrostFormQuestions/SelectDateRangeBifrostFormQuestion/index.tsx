import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableSelectDateRangeBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { CalendarDate } from "@/models/core/date/CalendarDate";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";

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
      calendarDateRange.startCalendarDate?.year &&
      calendarDateRange.startCalendarDate?.month &&
      calendarDateRange.startCalendarDate?.day &&
      calendarDateRange.endCalendarDate?.year &&
      calendarDateRange.endCalendarDate?.month &&
      calendarDateRange.endCalendarDate?.day
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
