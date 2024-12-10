import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableMultiSelectDateRangeBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { CalendarDate } from "@/models/core/date/CalendarDate";
import { convertLocalCalendarDateToNativeDate } from "@/utilities/dates/convertLocalCalendarDateToNativeDate";
import { DateRange } from "react-day-picker";
import { convertNativeDateToLocalCalendarDate } from "@/utilities/dates/convertNativeDateToLocalCalendarDate";

export interface MultiSelectDateRangeBifrostFormQuestionProps {
  renderableMultiSelectDateRangeBifrostFormQuestion: RenderableMultiSelectDateRangeBifrostFormQuestion;
  calendarDateRanges: PendingCalendarDateRange[];
  setCalendarDateRanges: ({
    updatedCalendarDateRanges,
  }: {
    updatedCalendarDateRanges: PendingCalendarDateRange[];
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

export function MultiSelectDateRangeBifrostFormQuestion({
  renderableMultiSelectDateRangeBifrostFormQuestion,
  calendarDateRanges,
  setCalendarDateRanges,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiSelectDateRangeBifrostFormQuestionProps) {
  const inputId: string = `MultiSelectDateRangeBifrostFormQuestion_${renderableMultiSelectDateRangeBifrostFormQuestion.bifrostFormQuestionId}`;

  // Initialize calendarDateRanges with an empty object
  // if no calendarDateRanges are provided for user to edit
  useEffect(() => {
    if (calendarDateRanges.length === 0) {
      setCalendarDateRanges({
        updatedCalendarDateRanges: [{}],
      });
    }
  }, [calendarDateRanges, setCalendarDateRanges]);

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

    if (!renderableMultiSelectDateRangeBifrostFormQuestion.required) {
      return areAllCalendarDateRangesComplete;
    } else {
      return (
        areAllCalendarDateRangesComplete &&
        completeCalendarDateRanges.length > 0
      );
    }
  };

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: areCalendarDateRangesValid({
        pendingCalendarDateRanges: calendarDateRanges,
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

      const updatedCalendarDateRanges = [...calendarDateRanges];

      const previousCalendarDateRange: PendingCalendarDateRange =
        calendarDateRanges[calendarDateRangeIndex];

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

      setCalendarDateRanges({
        updatedCalendarDateRanges,
      });

      setIsResponseValid({
        isResponseValid: areCalendarDateRangesValid({
          pendingCalendarDateRanges: updatedCalendarDateRanges,
        }),
      });
    };

  return (
    <FormField>
      <FormLabel htmlFor={inputId}>
        {renderableMultiSelectDateRangeBifrostFormQuestion.label}
      </FormLabel>
      {calendarDateRanges.map(
        (calendarDateRange: PendingCalendarDateRange, index: number) => {
          return (
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
              setDateRange={onChangeLocalCalendarDateRange(index)}
            />
          );
        }
      )}
    </FormField>
  );
}
