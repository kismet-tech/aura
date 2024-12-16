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

interface MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePickerProps {
  value: PendingCalendarDateRange[];
  setValue: ({
    updatedValue,
  }: {
    updatedValue: PendingCalendarDateRange[];
  }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
}

export function MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker({
  value,
  setValue,
  setIsResponseValid,
}: MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePickerProps) {
  const inputId: string = `MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker`;

  // Initialize calendarDateRanges with an empty object
  // if no calendarDateRanges are provided for user to edit
  useEffect(() => {
    if (value.length === 0) {
      setValue({
        updatedValue: [{}],
      });
    }
  }, [value, setValue]);

  const areCalendarDateRangesValid = ({
    pendingCalendarDateRanges,
  }: {
    pendingCalendarDateRanges: PendingCalendarDateRange[];
  }): boolean => {
    const nonEmptyCalendarDateRanges = pendingCalendarDateRanges.filter(
      (calendarDateRange: PendingCalendarDateRange) => {
        return (
          calendarDateRange.startCalendarDate ||
          calendarDateRange.endCalendarDate
        );
      }
    );

    const completeCalendarDateRanges = nonEmptyCalendarDateRanges.filter(
      (calendarDateRange: PendingCalendarDateRange) => {
        return (
          calendarDateRange.startCalendarDate &&
          calendarDateRange.endCalendarDate
        );
      }
    );

    const areAllCalendarDateRangesComplete: boolean =
      completeCalendarDateRanges.length === nonEmptyCalendarDateRanges.length;

    return (
      areAllCalendarDateRangesComplete && completeCalendarDateRanges.length > 0
    );
  };

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: areCalendarDateRangesValid({
        pendingCalendarDateRanges: value,
      }),
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  const onChangeLocalCalendarDateRange =
    (calendarDateRangeIndex: number) => (dateRange: DateRange | undefined) => {
      if (!dateRange) return;

      const updatedCalendarDateRanges = [...value];

      const previousCalendarDateRange: PendingCalendarDateRange =
        value[calendarDateRangeIndex];

      const updatedStartCalendarDate: CalendarDate | undefined = dateRange.from
        ? convertNativeDateToLocalCalendarDate(dateRange.from)
        : previousCalendarDateRange.startCalendarDate;

      const updatedEndCalendarDate: CalendarDate | undefined = dateRange.to
        ? convertNativeDateToLocalCalendarDate(dateRange.to)
        : previousCalendarDateRange.endCalendarDate;

      updatedCalendarDateRanges[calendarDateRangeIndex] = {
        startCalendarDate: updatedStartCalendarDate,
        endCalendarDate: updatedEndCalendarDate,
      };

      const lastCalendarDateRange: PendingCalendarDateRange =
        updatedCalendarDateRanges[updatedCalendarDateRanges.length - 1];

      if (
        lastCalendarDateRange.startCalendarDate &&
        lastCalendarDateRange.endCalendarDate
      ) {
        updatedCalendarDateRanges.push({});
      }

      setValue({
        updatedValue: updatedCalendarDateRanges,
      });

      setIsResponseValid({
        isResponseValid: areCalendarDateRangesValid({
          pendingCalendarDateRanges: updatedCalendarDateRanges,
        }),
      });
    };

  return (
    <FormField>
      <div className="gap-8">
        <FormLabel htmlFor={inputId}>Potential Dates</FormLabel>
      </div>
      {value.map(
        (calendarDateRange: PendingCalendarDateRange, index: number) => {
          return (
            <DateRangePicker
              key={index}
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
              setDateRange={onChangeLocalCalendarDateRange(index)}
            />
          );
        }
      )}
    </FormField>
  );
}
