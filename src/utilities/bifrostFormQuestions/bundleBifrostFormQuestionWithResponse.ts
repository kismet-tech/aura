import {
  BifrostFormQuestion,
  BifrostFormQuestionType,
  BifrostFormQuestionResponseType,
} from "@kismet_ai/foundation";

import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface BundleBifrostFormQuestionWithResponseProps {
  bifrostFormQuestion: BifrostFormQuestion;
}

export const bundleBifrostFormQuestionWithResponse = ({
  bifrostFormQuestion,
}: BundleBifrostFormQuestionWithResponseProps): {
  bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
} => {
  let bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;

  if (bifrostFormQuestion.type === BifrostFormQuestionType.TEXT_INPUT) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.TEXT,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.TEXT,
        responseValue: "",
      },
    };
  } else if (bifrostFormQuestion.type === BifrostFormQuestionType.EMAIL) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.EMAIL,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.EMAIL,
        responseValue: "",
      },
    };
  } else if (bifrostFormQuestion.type === BifrostFormQuestionType.PHONE) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.PHONE_NUMBER,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.PHONE_NUMBER,
        responseValue: "",
      },
    };
  } else if (bifrostFormQuestion.type === BifrostFormQuestionType.TEXT_AREA) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.TEXT,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.TEXT,
        responseValue: "",
      },
    };
  } else if (
    bifrostFormQuestion.type === BifrostFormQuestionType.TOGGLE_BUTTON_GROUP
  ) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.TEXT,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.TEXT,
        responseValue: "",
      },
    };
  } else if (
    bifrostFormQuestion.type === BifrostFormQuestionType.SELECT_DATE_RANGE
  ) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
        responseValue: {
          startCalendarDate: undefined,
          endCalendarDate: undefined,
        },
      },
    };
  } else if (
    bifrostFormQuestion.type === BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE
  ) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
        responseValue: [
          {
            startCalendarDate: undefined,
            endCalendarDate: undefined,
          },
        ],
      },
    };
  } else if (
    bifrostFormQuestion.type === BifrostFormQuestionType.SPLIT_TEXT_INPUT
  ) {
    bifrostFormQuestionWithResponse = {
      responseType: BifrostFormQuestionResponseType.SPLIT_TEXT,
      bifrostFormQuestion,
      responseData: {
        type: BifrostFormQuestionResponseType.SPLIT_TEXT,
        responseValue: {
          left: "",
          right: "",
        },
      },
    };
  } else {
    throw new Error(
      `Unsupported BifrostFormQuestionType: ${
        (bifrostFormQuestion as any).type
      }`
    );
  }

  return { bifrostFormQuestionWithResponse };
};
