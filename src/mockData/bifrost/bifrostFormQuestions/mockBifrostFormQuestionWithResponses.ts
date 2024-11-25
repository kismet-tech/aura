import { BifrostFormQuestionResponseType } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import {
  BifrostFormQuestionWithEmailResponse,
  BifrostFormQuestionWithPhoneNumberResponse,
  BifrostFormQuestionWithSplitTextResponse,
  BifrostFormQuestionWithTextResponse,
} from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  mockRenderableTextInputBifrostFormQuestionOne,
  mockRenderableEmailInputBifrostFormQuestionOne,
  mockRenderablePhoneInputBifrostFormQuestionOne,
  mockRenderableSplitTextInputBifrostFormQuestionOne,
  mockRenderableTextAreaBifrostFormQuestionOne,
  mockRenderableToggleButtonGroupBifrostFormQuestionOne,
} from "./mockRenderableBifrostFormQuestions";

export const mockBifrostFormQuestionWithTextResponseOne: BifrostFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableTextInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "This is a text response",
    },
  };

export const mockBifrostFormQuestionWithTextResponseTwo: BifrostFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableTextAreaBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "",
    },
  };

export const mockBifrostFormQuestionWithTextResponseThree: BifrostFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableToggleButtonGroupBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "",
    },
  };

export const mockBifrostFormQuestionWithEmailResponseOne: BifrostFormQuestionWithEmailResponse =
  {
    responseType: BifrostFormQuestionResponseType.EMAIL,
    bifrostFormQuestion: mockRenderableEmailInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.EMAIL,
      responseValue: "",
    },
  };
export const mockBifrostFormQuestionWithPhoneNumberResponseOne: BifrostFormQuestionWithPhoneNumberResponse =
  {
    responseType: BifrostFormQuestionResponseType.PHONE_NUMBER,
    bifrostFormQuestion: mockRenderablePhoneInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.PHONE_NUMBER,
      responseValue: "",
    },
  };

export const mockBifrostFormQuestionWithSplitTextResponseOne: BifrostFormQuestionWithSplitTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.SPLIT_TEXT,
    bifrostFormQuestion: mockRenderableSplitTextInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.SPLIT_TEXT,
      responseValue: {
        left: "",
        right: "",
      },
    },
  };
