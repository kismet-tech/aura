import { FormQuestionType } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
import React, { useEffect } from "react";
import { EmailInputBifrostFormQuestion } from "../EmailInputBifrostFormQuestion";
import { PhoneInputBifrostFormQuestion } from "../PhoneInputBifrostFormQuestion";
import { TextAreaBifrostFormQuestion } from "../TextAreaBifrostFormQuestion";
import { ToggleButtonGroupBifrostFormQuestion } from "../ToggleButtonGroupBifrostFormQuestion";
import { SelectDateRangeBifrostFormQuestion } from "../SelectDateRangeBifrostFormQuestion";
import { MultiSelectDateRangeBifrostFormQuestion } from "../MultiSelectDateRangeBifrostFormQuestion";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { SplitTextInputBifrostFormQuestion } from "../SplitTextInputBifrostFormQuestion";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  BifrostFormQuestionResponse,
  BifrostFormQuestionResponseType,
} from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { TextInputBifrostFormQuestion } from "../TextInputBifrostFormQuestion";

export interface RenderedBifrostFormQuestionProps {
  bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  setBifrostFormQuestionResponse: ({
    bifrostFormQuestionResponse,
  }: {
    bifrostFormQuestionResponse: BifrostFormQuestionResponse;
  }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
}

export function RenderedBifrostFormQuestion({
  bifrostFormQuestionWithResponse,
  setBifrostFormQuestionResponse,
  setIsResponseValid,
}: RenderedBifrostFormQuestionProps) {
  const { bifrostFormQuestion, responseData, responseType } =
    bifrostFormQuestionWithResponse;

  if (responseType === BifrostFormQuestionResponseType.TEXT) {
    if (bifrostFormQuestion.type === FormQuestionType.TEXT_INPUT) {
      return (
        <TextInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableTextInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    } else if (bifrostFormQuestion.type === FormQuestionType.TEXT_AREA) {
      return (
        <TextAreaBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableTextAreaBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    } else if (
      bifrostFormQuestion.type === FormQuestionType.TOGGLE_BUTTON_GROUP
    ) {
      return (
        <ToggleButtonGroupBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableToggleButtonGroupBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.TEXT,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.PHONE_NUMBER) {
    if (bifrostFormQuestion.type === FormQuestionType.PHONE) {
      return (
        <PhoneInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderablePhoneInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.PHONE_NUMBER,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.EMAIL) {
    if (bifrostFormQuestion.type === FormQuestionType.EMAIL) {
      return (
        <EmailInputBifrostFormQuestion
          key={bifrostFormQuestion.bifrostFormQuestionId}
          renderableEmailInputBifrostFormQuestion={bifrostFormQuestion}
          value={responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.EMAIL,
                responseValue: updatedValue,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  } else if (
    responseType === BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE
  ) {
    if (bifrostFormQuestion.type === FormQuestionType.SELECT_DATE_RANGE) {
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
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
                responseValue: updatedCalendarDateRange,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  } else if (
    responseType === BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE
  ) {
    if (bifrostFormQuestion.type === FormQuestionType.MULTI_SELECT_DATE_RANGE) {
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
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
                responseValue: updatedCalendarDateRanges,
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  } else if (responseType === BifrostFormQuestionResponseType.SPLIT_TEXT) {
    if (bifrostFormQuestion.type === FormQuestionType.SPLIT_TEXT_INPUT) {
      return (
        <SplitTextInputBifrostFormQuestion
          key={`${bifrostFormQuestion.left.bifrostFormQuestionId}-${bifrostFormQuestion.right.bifrostFormQuestionId}`}
          renderableSplitTextInputBifrostFormQuestion={bifrostFormQuestion}
          leftValue={responseData.responseValue.left}
          rightValue={responseData.responseValue.right}
          setLeftValue={({ updatedValue }: { updatedValue: string }) => {
            setBifrostFormQuestionResponse({
              bifrostFormQuestionResponse: {
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
              bifrostFormQuestionResponse: {
                type: BifrostFormQuestionResponseType.SPLIT_TEXT,
                responseValue: {
                  ...responseData.responseValue,
                  right: updatedValue,
                },
              },
            });
          }}
          setIsResponseValid={setIsResponseValid}
        />
      );
    }
  }
  return <></>;
}
