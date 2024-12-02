import React, { useState } from "react";
import {
  BifrostFormQuestionWithResponse,
  BifrostTextAreaFormQuestionWithTextResponse,
  BifrostTextInputFormQuestionWithTextResponse,
  BifrostToggleButtonGroupFormQuestionWithTextResponse,
} from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormQuestionResponseType } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionType } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { SplitTextInputBifrostFormQuestionChatHistoryElement } from "../SplitTextInputBifrostFormQuestionChatHistoryElement";
import { PhoneInputBifrostFormQuestionChatHistoryElement } from "../PhoneInputBifrostFormQuestionChatHistoryElement";
import { TextInputBifrostFormQuestionChatHistoryElement } from "../TextInputBifrostFormQuestionChatHistoryElement";
import { TextAreaInputBifrostFormQuestionChatHistoryElement } from "../TextAreaInputBifrostFormQuestionChatHistoryElement";
import { ToggleButtonGroupBifrostFormQuestionChatHistoryElement } from "../ToggleButtonGroupBifrostFormQuestionChatHistoryElement";
import { EmailInputBifrostFormQuestionChatHistoryElement } from "../EmailInputBifrostFormQuestionChatHistoryElement";
import { CalendarDateRangeBifrostFormQuestionChatHistoryElement } from "../CalendarDateRangeBifrostFormQuestionChatHistoryElement";
import { MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement } from "../MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement";
import { EmailInputBifrostFormQuestion } from "@/components/bifrostForm/bifrostFormQuestions/EmailInputBifrostFormQuestion";

export interface BifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  onClick: () => void;
}

export function BifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithResponse,
  onClick,
}: BifrostFormQuestionChatHistoryElementProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.TEXT &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.TEXT_INPUT
  ) {
    return (
      <TextInputBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostTextInputFormQuestionWithTextResponse={
          bifrostFormQuestionWithResponse as BifrostTextInputFormQuestionWithTextResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.TEXT &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.TEXT_AREA
  ) {
    return (
      <TextAreaInputBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostTextAreaFormQuestionWithTextResponse={
          bifrostFormQuestionWithResponse as BifrostTextAreaFormQuestionWithTextResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.TEXT &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.TOGGLE_BUTTON_GROUP
  ) {
    return (
      <ToggleButtonGroupBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostToggleButtonGroupFormQuestionWithTextResponse={
          bifrostFormQuestionWithResponse as BifrostToggleButtonGroupFormQuestionWithTextResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.PHONE_NUMBER &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.PHONE
  ) {
    return (
      <PhoneInputBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostFormQuestionWithPhoneNumberResponse={
          bifrostFormQuestionWithResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.EMAIL &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.EMAIL
  ) {
    if (!isBeingEdited) {
      return (
        <EmailInputBifrostFormQuestionChatHistoryElement
          guestFirstName={guestFirstName}
          bifrostFormQuestionWithEmailResponse={bifrostFormQuestionWithResponse}
          onClick={() => {
            onClick();
            setIsBeingEdited(true);
          }}
        />
      );
    } else {
      return (
        <EmailInputBifrostFormQuestion
          renderableEmailInputBifrostFormQuestion={
            bifrostFormQuestionWithResponse.bifrostFormQuestion
          }
          value={bifrostFormQuestionWithResponse.responseData.responseValue}
          setValue={({ updatedValue }: { updatedValue: string }) => {}}
          setIsResponseValid={({
            isResponseValid,
          }: {
            isResponseValid: boolean;
          }) => {}}
        />
      );
    }
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.SELECT_DATE_RANGE
  ) {
    return (
      <CalendarDateRangeBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostFormQuestionWithCalendarDateRangeResponse={
          bifrostFormQuestionWithResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE
  ) {
    return (
      <MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostFormQuestionWithMultiCalendarDateRangeResponse={
          bifrostFormQuestionWithResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else if (
    bifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.SPLIT_TEXT &&
    bifrostFormQuestionWithResponse.bifrostFormQuestion.type ===
      BifrostFormQuestionType.SPLIT_TEXT_INPUT
  ) {
    return (
      <SplitTextInputBifrostFormQuestionChatHistoryElement
        guestFirstName={guestFirstName}
        bifrostFormQuestionWithSplitTextResponse={
          bifrostFormQuestionWithResponse
        }
        onClick={() => {
          onClick();
          setIsBeingEdited(true);
        }}
      />
    );
  } else {
    return <></>;
  }
}
