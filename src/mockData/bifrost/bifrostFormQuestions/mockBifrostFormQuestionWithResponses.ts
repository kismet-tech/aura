import { BifrostFormQuestionResponseType } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import {
  BifrostFormQuestionWithCalendarDateRangeResponse,
  BifrostFormQuestionWithEmailResponse,
  BifrostFormQuestionWithMultiCalendarDateRangeResponse,
  BifrostFormQuestionWithPhoneNumberResponse,
  BifrostFormQuestionWithSplitTextResponse,
  BifrostFormQuestionWithTextResponse,
  BifrostTextAreaFormQuestionWithTextResponse,
  BifrostTextInputFormQuestionWithTextResponse,
  BifrostToggleButtonGroupFormQuestionWithTextResponse,
} from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  mockRenderableTextInputBifrostFormQuestionOne,
  mockRenderableEmailInputBifrostFormQuestionOne,
  mockRenderablePhoneInputBifrostFormQuestionOne,
  mockRenderableSplitTextInputBifrostFormQuestionOne,
  mockRenderableTextAreaBifrostFormQuestionOne,
  mockRenderableToggleButtonGroupBifrostFormQuestionOne,
  mockRenderableMultiSelectDateRangeBifrostFormQuestionOne,
  mockRenderableSelectDateRangeBifrostFormQuestionOne,
} from "./mockRenderableBifrostFormQuestions";
import { ReservedBifrostReasonForTravelOptionValues } from "@/models/BifrostFormQuestions/ReservedBifrostFormQuestionValues";

export const mockBifrostFormQuestionWithTextResponseOne: BifrostTextInputFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableTextInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "Julian",
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

export const mockBifrostFormQuestionWithTextResponseThree: BifrostTextAreaFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableTextAreaBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "I am planning a ski trip",
    },
  };

export const mockBifrostFormQuestionWithTextResponseFour: BifrostFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableToggleButtonGroupBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: "",
    },
  };

export const mockBifrostFormQuestionWithTextResponseFive: BifrostToggleButtonGroupFormQuestionWithTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.TEXT,
    bifrostFormQuestion: mockRenderableToggleButtonGroupBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.TEXT,
      responseValue: ReservedBifrostReasonForTravelOptionValues.BUSINESS,
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

export const mockBifrostFormQuestionWithEmailResponseTwo: BifrostFormQuestionWithEmailResponse =
  {
    responseType: BifrostFormQuestionResponseType.EMAIL,
    bifrostFormQuestion: mockRenderableEmailInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.EMAIL,
      responseValue: "julian@makekismet.com",
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

export const mockBifrostFormQuestionWithPhoneNumberResponseTwo: BifrostFormQuestionWithPhoneNumberResponse =
  {
    responseType: BifrostFormQuestionResponseType.PHONE_NUMBER,
    bifrostFormQuestion: mockRenderablePhoneInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.PHONE_NUMBER,
      responseValue: "6466600326",
    },
  };

export const mockBifrostFormQuestionWithCalendarDateRangeResponseOne: BifrostFormQuestionWithCalendarDateRangeResponse =
  {
    responseType: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
    bifrostFormQuestion: mockRenderableSelectDateRangeBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE,
      responseValue: {
        startCalendarDate: {
          year: 2025,
          month: 2,
          day: 4,
        },
        endCalendarDate: {
          year: 2025,
          month: 2,
          day: 8,
        },
      },
    },
  };

export const mockBifrostFormQuestionWithMultiCalendarDateRangeResponseOne: BifrostFormQuestionWithMultiCalendarDateRangeResponse =
  {
    responseType: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
    bifrostFormQuestion:
      mockRenderableMultiSelectDateRangeBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE,
      responseValue: [
        {
          startCalendarDate: {
            year: 2025,
            month: 2,
            day: 4,
          },
          endCalendarDate: {
            year: 2025,
            month: 2,
            day: 8,
          },
        },
        {
          startCalendarDate: {
            year: 2025,
            month: 2,
            day: 8,
          },
          endCalendarDate: {
            year: 2025,
            month: 2,
            day: 12,
          },
        },
      ],
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

export const mockBifrostFormQuestionWithSplitTextResponseTwo: BifrostFormQuestionWithSplitTextResponse =
  {
    responseType: BifrostFormQuestionResponseType.SPLIT_TEXT,
    bifrostFormQuestion: mockRenderableSplitTextInputBifrostFormQuestionOne,
    responseData: {
      type: BifrostFormQuestionResponseType.SPLIT_TEXT,
      responseValue: {
        left: "Julian",
        right: "Trajanson",
      },
    },
  };
