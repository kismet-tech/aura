import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import {
  BifrostFormQuestionMultiStageSmartDateResponseValue,
  CalendarDateRange,
  PendingCalendarDateRange,
  RenderableMultiStageSmartDateSelectorBifrostFormQuestion,
  ReservedBifrostDateFlexibilityOptionValues,
} from "@kismet_ai/foundation";
import React, { useState } from "react";
import { MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker } from "./MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker";
import { MultiStageSmartDateSelectorQuestionDateFlexibilitySelector } from "./MultiStageSmartDateSelectorQuestionDateFlexibilitySelector";
import { MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker } from "./MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker";
import { MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInput } from "./MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInput";
import { MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelector } from "./MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelector";
// eslint-disable-next-line


export interface MultiStageSmartDateSelectorQuestionProps {
  renderableMultiStageSmartDateSelectorBifrostFormQuestion: RenderableMultiStageSmartDateSelectorBifrostFormQuestion;
  value: BifrostFormQuestionMultiStageSmartDateResponseValue;

  setValue: ({
    updatedValue,
  }: {
    updatedValue: BifrostFormQuestionMultiStageSmartDateResponseValue;
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

  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;
}

export function MultiStageSmartDateSelectorQuestion({
  renderableMultiStageSmartDateSelectorBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
  suggestCalendarDateRangesFromConstraints,
}: MultiStageSmartDateSelectorQuestionProps) {
  const dateFlexibilitySelectorQuestion: React.JSX.Element = (
    <MultiStageSmartDateSelectorQuestionDateFlexibilitySelector
      value={value.dateFlexibility}
      setValue={({
        updatedValue,
      }: {
        updatedValue: ReservedBifrostDateFlexibilityOptionValues | undefined;
      }) => {
        setValue({
          updatedValue: {
            ...value,
            dateFlexibility: updatedValue,
            calendarDateRanges: undefined,
          },
        });
      }}
    />
  );

  const singleCalendarDateRangePickerQuestion: React.JSX.Element =
    value.dateFlexibility ===
    ReservedBifrostDateFlexibilityOptionValues.FIRM_DATES ? (
      <MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker
        value={value.calendarDateRanges ? value.calendarDateRanges[0] : {}}
        setValue={({
          updatedValue,
        }: {
          updatedValue: PendingCalendarDateRange | undefined;
        }) => {
          setValue({
            updatedValue: {
              ...value,
              calendarDateRanges: updatedValue ? [updatedValue] : [],
            },
          });
        }}
        setIsResponseValid={({
          isResponseValid,
        }: {
          isResponseValid: boolean;
        }) => {}}
        setHasQuestionBeenRespondedTo={({
          hasQuestionBeenRespondedTo,
        }: {
          hasQuestionBeenRespondedTo: boolean;
        }) => {
          setHasQuestionBeenRespondedTo({
            hasQuestionBeenRespondedTo,
          });
        }}
      />
    ) : (
      <></>
    );

  const multiCalendarDateRangePickerQuestion: React.JSX.Element =
    value.dateFlexibility ===
    ReservedBifrostDateFlexibilityOptionValues.FLEXIBLE_DATES ? (
      <MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker
        value={value.calendarDateRanges ? value.calendarDateRanges : []}
        setValue={({
          updatedValue,
        }: {
          updatedValue: PendingCalendarDateRange[];
        }) => {
          setValue({
            updatedValue: {
              ...value,
              calendarDateRanges: updatedValue,
            },
          });
        }}
        setIsResponseValid={({
          isResponseValid,
        }: {
          isResponseValid: boolean;
        }) => {}}
      />
    ) : (
      <></>
    );

  const [
    hasDescriptionOfPotentialCalendarDatesBeenResondedTo,
    setHasDescriptionOfPotentialCalendarDatesBeenResondedTo,
  ] = useState(false);

  const potentialCalendarDatesInputQuestion: React.JSX.Element =
    value.dateFlexibility ===
    ReservedBifrostDateFlexibilityOptionValues.STILL_DECIDING ? (
      <MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInput
        value={value.descriptionOfPotentialCalendarDates || ""}
        setValue={({ updatedValue }: { updatedValue: string }) => {
          setValue({
            updatedValue: {
              ...value,
              descriptionOfPotentialCalendarDates: updatedValue,
            },
          });
        }}
        setIsResponseValid={({
          isResponseValid,
        }: {
          isResponseValid: boolean;
        }) => {}}
        setHasQuestionBeenRespondedTo={({
          hasQuestionBeenRespondedTo,
        }: {
          hasQuestionBeenRespondedTo: boolean;
        }) => {
          setHasDescriptionOfPotentialCalendarDatesBeenResondedTo(
            hasQuestionBeenRespondedTo
          );
        }}
      />
    ) : (
      <></>
    );

  const suggestedCalendarDateRangeSelectorQuestion =
    value.dateFlexibility ===
      ReservedBifrostDateFlexibilityOptionValues.STILL_DECIDING &&
    value.descriptionOfPotentialCalendarDates &&
    hasDescriptionOfPotentialCalendarDatesBeenResondedTo ? (
      <MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelector
        suggestedCalendarDateRanges={value.suggestedCalendarDateRanges}
        setSuggestedCalendarDateRanges={({
          updatedSuggestedCalendarDateRanges,
        }: {
          updatedSuggestedCalendarDateRanges: CalendarDateRange[];
        }) => {
          setValue({
            updatedValue: {
              ...value,
              suggestedCalendarDateRanges: updatedSuggestedCalendarDateRanges,
            },
          });
        }}
        values={
          value.calendarDateRanges
            ? (value.calendarDateRanges.filter(
                (calendarDateRange: PendingCalendarDateRange) => {
                  return (
                    calendarDateRange.startCalendarDate &&
                    calendarDateRange.startCalendarDate.year &&
                    calendarDateRange.startCalendarDate.month &&
                    calendarDateRange.startCalendarDate.day &&
                    calendarDateRange.endCalendarDate &&
                    calendarDateRange.endCalendarDate.year &&
                    calendarDateRange.endCalendarDate.month &&
                    calendarDateRange.endCalendarDate.day
                  );
                }
              ) as CalendarDateRange[])
            : []
        }
        descriptionOfPotentialCalendarDates={
          value.descriptionOfPotentialCalendarDates
        }
        suggestCalendarDateRangesFromConstraints={
          suggestCalendarDateRangesFromConstraints
        }
        setValues={({
          updatedValue,
        }: {
          updatedValue: CalendarDateRange[];
        }) => {
          setValue({
            updatedValue: {
              ...value,
              calendarDateRanges: updatedValue,
            },
          });

          setIsResponseValid({ isResponseValid: true });
        }}
      />
    ) : (
      <></>
    );

  return (
    <div>
      <div>
        <KismetSectionHeader>
          {renderableMultiStageSmartDateSelectorBifrostFormQuestion.label}
        </KismetSectionHeader>
      </div>
      <div>{dateFlexibilitySelectorQuestion}</div>
      <div>{singleCalendarDateRangePickerQuestion}</div>
      <div>{multiCalendarDateRangePickerQuestion}</div>
      <div>{potentialCalendarDatesInputQuestion}</div>
      <div>{suggestedCalendarDateRangeSelectorQuestion}</div>
    </div>
  );
}
