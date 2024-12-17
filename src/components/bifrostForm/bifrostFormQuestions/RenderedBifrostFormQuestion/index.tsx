import React from "react";
import { EmailInputBifrostFormQuestion } from "../EmailInputBifrostFormQuestion";
import { PhoneInputBifrostFormQuestion } from "../PhoneInputBifrostFormQuestion";
import { TextAreaBifrostFormQuestion } from "../TextAreaBifrostFormQuestion";
import { ToggleButtonGroupBifrostFormQuestion } from "../ToggleButtonGroupBifrostFormQuestion";
import { SelectDateRangeBifrostFormQuestion } from "../SelectDateRangeBifrostFormQuestion";
import { MultiSelectDateRangeBifrostFormQuestion } from "../MultiSelectDateRangeBifrostFormQuestion";
import {
  BifrostFormQuestionMultiStageReasonForTravelResponseValue,
  HotelBifrostFormMetadata,
  PendingCalendarDateRange,
} from "@kismet_ai/foundation";
import { SplitTextInputBifrostFormQuestion } from "../SplitTextInputBifrostFormQuestion";
import { TextInputBifrostFormQuestion } from "../TextInputBifrostFormQuestion";
import {
  BifrostFormQuestionMultiStageSmartDateResponseValue,
  BifrostFormQuestionResponse,
  BifrostFormQuestionResponseType,
  BifrostFormQuestionType,
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
} from "@kismet_ai/foundation";
import { MultiStageSmartDateSelectorQuestion } from "../MultiStageSmartDateSelectorQuestion";
import { MultiStageReasonForTravelQuestion } from "../MultiStageReasonForTravelQuestion";
import { SelectorBifrostFormQuestion } from "../SelectorBifrostFormQuestion";

export interface RenderedBifrostFormQuestionProps {
  bifrostFormMetadata: HotelBifrostFormMetadata;
  bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  setBifrostFormQuestionResponse: ({
    updatedBifrostFormQuestionResponse,
  }: {
    updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
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

export function RenderedBifrostFormQuestion({
  bifrostFormMetadata,
  bifrostFormQuestionWithResponse,
  setBifrostFormQuestionResponse,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
  suggestCalendarDateRangesFromConstraints,
}: RenderedBifrostFormQuestionProps) {
  const { bifrostFormQuestion, responseData, responseType } =
    bifrostFormQuestionWithResponse;

  if (responseType === BifrostFormQuestionResponseType.TEXT) {
    if (bifrostFormQuestion.type === BifrostFormQuestionType.TEXT_INPUT) {
      return (
        <TextInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableTextInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    } else if (bifrostFormQuestion.type === BifrostFormQuestionType.TEXT_AREA) {
      return (
        <TextAreaBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableTextAreaBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    } else if (bifrostFormQuestion.type === BifrostFormQuestionType.SELECTOR) {
      return (
        <SelectorBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableSelectorBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    } else if (
      bifrostFormQuestion.type === BifrostFormQuestionType.TOGGLE_BUTTON_GROUP
    ) {
      return (
        <ToggleButtonGroupBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableToggleButtonGroupBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.PHONE_NUMBER) {
    if (bifrostFormQuestion.type === BifrostFormQuestionType.PHONE) {
      return (
        <PhoneInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderablePhoneInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.PHONE_NUMBER,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.EMAIL) {
    if (bifrostFormQuestion.type === BifrostFormQuestionType.EMAIL) {
      return (
        <EmailInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableEmailInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.EMAIL,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (
    responseType === BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE
  ) {
    if (
      bifrostFormQuestion.type === BifrostFormQuestionType.SELECT_DATE_RANGE
    ) {
      return (
        <SelectDateRangeBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableSelectDateRangeBifrostFormQuestion={bifrostFormQuestion}
          calendarDateRange={responseData.responseValue}
          setCalendarDateRange={({
            updatedCalendarDateRange,
          }: {
            updatedCalendarDateRange: PendingCalendarDateRange;
          }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
                responseValue: updatedCalendarDateRange,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (
    responseType === BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE
  ) {
    if (
      bifrostFormQuestion.type ===
      BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE
    ) {
      return (
        <MultiSelectDateRangeBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableMultiSelectDateRangeBifrostFormQuestion={
            bifrostFormQuestion
          }
          calendarDateRanges={responseData.responseValue}
          setCalendarDateRanges={({
            updatedCalendarDateRanges,
          }: {
            updatedCalendarDateRanges: PendingCalendarDateRange[];
          }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
                responseValue: updatedCalendarDateRanges,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.SPLIT_TEXT) {
    if (bifrostFormQuestion.type === BifrostFormQuestionType.SPLIT_TEXT_INPUT) {
      return (
        <SplitTextInputBifrostFormQuestion
          key={`${bifrostFormQuestion.left.bifrostFormQuestionId}-${bifrostFormQuestion.right.bifrostFormQuestionId}`}
          renderableSplitTextInputBifrostFormQuestion={bifrostFormQuestion}
          leftValue={responseData.responseValue.left}
          rightValue={responseData.responseValue.right}
          setLeftValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.SPLIT_TEXT,
                responseValue: {
                  ...responseData.responseValue,
                  left: updatedValue,
                },
              },
            });
          }}
          setRightValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.SPLIT_TEXT,
                responseValue: {
                  ...responseData.responseValue,
                  right: updatedValue,
                },
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  } else if (
    responseType === BifrostFormQuestionResponseType.MULTI_STAGE_SMART_DATE
  ) {
    if (
      bifrostFormQuestion.type ===
      BifrostFormQuestionType.MULTI_STAGE_SMART_DATE_SELECTOR
    ) {
      return (
        <MultiStageSmartDateSelectorQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableMultiStageSmartDateSelectorBifrostFormQuestion={
            bifrostFormQuestion
          }
          value={responseData.responseValue}
          setValue={({
            updatedValue,
          }: {
            updatedValue: BifrostFormQuestionMultiStageSmartDateResponseValue;
          }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.MULTI_STAGE_SMART_DATE,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
          suggestCalendarDateRangesFromConstraints={
            suggestCalendarDateRangesFromConstraints
          }
        />
      );
    }
  } else if (
    responseType ===
    BifrostFormQuestionResponseType.MULTI_STAGE_REASON_FOR_TRAVEL
  ) {
    if (
      bifrostFormQuestion.type ===
      BifrostFormQuestionType.MULTI_STAGE_REASON_FOR_TRAVEL
    ) {
      return (
        <MultiStageReasonForTravelQuestion
          bifrostFormMetadata={bifrostFormMetadata}
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableMultiStageReasonForTravelBifrostFormQuestion={
            bifrostFormQuestion
          }
          value={responseData.responseValue}
          setValue={({
            updatedValue,
          }: {
            updatedValue: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
          }) => {
            setBifrostFormQuestionResponse({
              updatedBifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.MULTI_STAGE_REASON_FOR_TRAVEL,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
          setHasQuestionBeenRespondedTo={setHasQuestionBeenRespondedTo}
        />
      );
    }
  }
  return <></>;
}
